// @flow

import firebase from "firebase";
import * as dataLayerActions from "./data-layer-actions";
import User from "../models/user";
import TeamMember from "../models/team-member";
import Town from "../models/town";
import Message from "../models/message";
import Invitation from "../models/invitation";
import * as actionTypes from "../constants/action-types";
import { firebaseConfig } from "../firebase-config";
import "firebase/firestore";
import { curry } from "ramda";
import * as messageTypes from "../constants/message-types";
import TrashDrop from "../models/trash-drop";
import * as teamStatuses from "../constants/team-member-statuses";
import TrashCollectionSite from "../models/trash-collection-site";
import SupplyDistributionSite from "../models/supply-distribution-site";
import Celebration from "../models/celebration";
import Team from "../models/team";
import * as R from "ramda";

firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
const db = firebase.firestore();

// Disable deprecated features
db.settings({});

let myListeners = {};

const deconstruct = (obj: Object): Object => JSON.parse(JSON.stringify(obj));

const removeListener = (key: string) => {
    if (myListeners[key]) {
        myListeners[key]();
        delete myListeners[key];
    }
};

const addListener = (key: string, listener: () => void) => {
    if (!key) {
        throw Error("Cannot add listener. Invalid listener key");
    }
    removeListener(key);
    myListeners[key] = listener;
};

const removeAllListeners = (): Promise<any> => (
    new Promise((resolve: any=>void, reject: any=>void) => {
        try {
            Object
                .values(myListeners)
                .forEach((listener: any) => {
                    listener();
                });
            myListeners = {};
            resolve(true);
        } catch (e) {
            reject(e);
        }
    })
);

type ReturnType = (string | Array<string> | Object);
type EntryType = { toString: ()=>string, map: (any=>ReturnType)=>Array<ReturnType> };

function returnType(entry: EntryType): (string | Array<string> | Object) {
    switch (true) {
        case (entry instanceof Date):
            return entry.toString();
        case Array.isArray(entry):
            return entry.map((x: EntryType): ReturnType => returnType(x));
        case entry !== null && typeof entry === "object" :
            return stringifyDates(entry); // eslint-disable-line
        default:
            return entry;
    }
}

function stringifyDates(obj: Object): Object {
    return Object.entries(obj).reduce((returnObj: Object, entry: [string, any]): Object => Object.assign({}, returnObj, {
        [entry[0]]: returnType(entry[1])
    }), {});
}

/** *************** Profiles ***************  **/

export function updateProfile(profile: Object, dispatch: any => any): Promise<any> {
    const newProfile = Object.assign({}, profile, { updated: (new Date()).toString() }); // TODO fix this hack right
    const profileUpdate = db.collection("profiles").doc(profile.uid).update(newProfile);
    return profileUpdate.catch((error: Object) => {
        dispatch(dataLayerActions.profileUpdateFail(error));
    });
}

function createProfile(user: UserType, dispatch: Dispatch<ActionType>): Promise<any> {
    const now = new Date();
    const newProfile = User.create(user);

    return db.collection("profiles").doc(newProfile.uid).set({
        ...newProfile,
        created: now,
        updated: now
    }).catch((error: Object) => {
        dispatch(dataLayerActions.profileCreateFail(error));
    });
}

/** *************** INITIALIZATION *************** **/


const setupInvitedTeamMemberListener = (teamIds: Array<string>, dispatch: Dispatch<ActionType>): Array<any> => (teamIds || []).map((teamId) => {
    const ref = db.collection(`teams/${ teamId }/invitations`);

    const onSnapshot = (querySnapshot: Object) => {
        const data = [];
        querySnapshot.forEach((_doc: Object) => {
            data.push({ ..._doc.data(), id: _doc.id });
        });
        const invitees = data.reduce((obj, member): Object => ({ ...obj, [member.uid]: member }), {});
        dispatch(dataLayerActions.inviteesFetchSuccessful(invitees, teamId));
    };
    const onError = ((error: Object | string) => {
        // eslint-disable-next-line no-console
        console.error("setupInvitedTeamMember Error: ", error);
        // TODO : Handle the error
    });

    addListener(`teamMembers_${ teamId }_invitations}`, ref.onSnapshot(onSnapshot, onError));
});

function setupInvitationListener(email: ?string = "", dispatch: Dispatch<ActionType>) {
    const ref = db.collection(`/invitations/${ email || "" }/teams`);

    addListener(`invitations_${ email || "" }_teams`,
        ref.onSnapshot(
            (querySnapshot: QuerySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc: Object) => {
                    data.push(Invitation.create({ ...doc.data(), id: doc.id }));
                });
                // this should be an array not an object
                const invitations = data.reduce(
                    (obj: Object, team: Object): Object => ({
                        ...obj,
                        [team.id]: team
                    }), {});
                const messages = Object.values(data).reduce((obj: Object, invite: Object): Object => (
                    {
                        ...obj, [invite.id]: Message.create({
                            id: invite.id,
                            text: `${ (invite.sender || {}).displayName } has invited you to join team : ${ (invite.team || {}).name }`,
                            sender: invite.sender,
                            teamId: (invite.team || {}).id,
                            read: false,
                            active: true,
                            link: null,
                            type: messageTypes.INVITATION,
                            created: invite.created
                        })
                    }
                ), {});

                // Add listeners for new team member list changes
                // Object.keys(invitations).forEach(key => {
                //     setupInvitedTeamMemberListener(key, dispatch);
                // });
                dispatch(dataLayerActions.messageFetchSuccessful({ invitations: messages }));
                dispatch(dataLayerActions.invitationFetchSuccessful(invitations));
            },
            ((error: Error) => {
                // eslint-disable-next-line no-console
                console.error("setupInvitationListener Error", error);
                // TODO : Handle the error
            })
        )
    );
}

function setupMessageListener(uid: ?string = "", dispatch: Dispatch<ActionType>) {
    const ref = db.collection(`messages/${ uid || "" }/messages`);

    addListener(`message_${ uid || "" }_messages`, ref.onSnapshot(
        (querySnapshot: QuerySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc: Object) => {
                data.push({ ...doc.data(), id: doc.id });
            });
            const messages = data.reduce((obj: Object, message: MessageType): Object => ({
                ...obj,
                [message.id]: Message.create(message)
            }), {});
            dispatch(dataLayerActions.messageFetchSuccessful({ [uid || ""]: messages }));
        },
        ((error: Error) => {
            // eslint-disable-next-line no-console
            console.error("setupMessageListener Error", error);
            // TODO : Handle the error
        })
    ));
}


function setupTeamMemberListener(teamIds: Array<string> = [], dispatch: Dispatch<ActionType>) {

    const addTeamMemberListener = (teamId: string) => {
        addListener(`team_${ teamId }_members`, db.collection(`teams/${ teamId }/members`)
            .onSnapshot(
                (querySnapshot: QuerySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((_doc: Object) => {
                        data.push({ ..._doc.data(), id: _doc.id });
                    });
                    const members = data.reduce((obj: Object, member: TeamMemberType): Object => (
                        {
                            ...obj,
                            [member.uid]: member
                        }
                    ), {});
                    dispatch(dataLayerActions.teamMemberFetchSuccessful(members, teamId));
                },
                ((error: string | Object) => {
                    // eslint-disable-next-line no-console
                    console.error("setupTeamMemberListener Error", error);
                    // TODO : Handle the error
                })
            ));
    };

    (teamIds || []).forEach((teamId: string) => {
        addTeamMemberListener(teamId);
    });
}

function setupTeamRequestListener(teamIds: Array<string>, dispatch: Dispatch<ActionType>) {
    (teamIds || []).map((teamId: string): void =>
        addListener(`team_${ teamId }_requests`,
            db.collection(`teams/${ teamId }/requests`).onSnapshot(
                (querySnapshot: QuerySnapshot) => {
                    const data = [];
                    querySnapshot.forEach((_doc: Object) => {
                        data.push({ ..._doc.data(), id: _doc.id });
                    });
                    const members = data.reduce((obj: Object, member: TeamMemberType): Object => ({
                        ...obj,
                        [member.uid]: member
                    }), {});
                    dispatch(dataLayerActions.teamRequestFetchSuccessful(members, teamId));
                },
                ((error: Error) => {
                    // eslint-disable-next-line no-console
                    console.error("setupTeamRequestListener Error", error);
                    // TODO : Handle the error
                })
            )
        )
    );
}

function setupTeamMessageListener(teamIds: Array<string>, dispatch: any => any) {
    (teamIds || []).map((teamId: string) => {
        const ref = db.collection(`teams/${ teamId }/messages`);

        addListener(`team_${ teamId }_messages`, ref.onSnapshot(
            ((querySnapshot: QuerySnapshot) => {
                const data = [];
                querySnapshot.forEach((doc: Object) => {
                    data.push({ ...doc.data(), id: doc.id });
                });
                const messages = data.reduce((obj: Object, message: MessageType): Object => (
                    {
                        ...obj,
                        [message.id]: Message.create(message)
                    }
                ), {});
                dispatch(dataLayerActions.messageFetchSuccessful({ [teamId]: messages }));
            }),
            ((error: Error) => {
                // eslint-disable-next-line no-console
                console.error(`setupTeamMessageListener Error for team ${ teamId }`, error);
                // TODO : Handle the error
            })
        ));
    });
}

function setupProfileListener(user: UserType, dispatch: Dispatch<ActionType>) {
    const { uid } = user;

    addListener(`profiles_${ uid || "" }`, db.collection("profiles").doc(uid)
        .onSnapshot((doc: Object) => {
            if (doc.exists) {
                const data = doc.data();
                dispatch({ type: actionTypes.FETCH_PROFILE_SUCCESS, data });
            } else {
                // just in case
                createProfile(user, dispatch);
            }
        }));
}

function setupMyTeamsListener(user: UserType, dispatch: Dispatch<ActionType>) {
    const { uid } = user;

    const gotSnapshot = (querySnapshot: QuerySnapshot) => {
        const data = [];
        const ids = [];
        querySnapshot.forEach((doc: Object) => {
            data.push({ ...doc.data(), id: doc.id });
            ids.push(doc.id);
        });
        const myTeams = data.reduce((obj: Object, team: TeamType): Object => ({ ...obj, [team.id]: team }), {});
        dispatch({ type: actionTypes.FETCH_MY_TEAMS_SUCCESS, data: myTeams });
        setupTeamMessageListener(ids, dispatch);
        setupTeamMemberListener(ids, dispatch);
        // Add additional listeners for team owners
        const ownedTeamIds = data
            .filter((team: TeamType): boolean => Boolean(team.id && team.owner && team.owner.uid === uid))
            .map((team: TeamType): string => (team.id || ""));
        setupInvitedTeamMemberListener(ownedTeamIds, dispatch);
        setupTeamRequestListener(ownedTeamIds, dispatch);
    };

    const snapShotError = (error: Error) => {
        // eslint-disable-next-line no-console
        console.error("setupMyTeamsListener error", error);
        setTimeout(() => {
            dispatch({ type: actionTypes.FETCH_MY_TEAMS_FAIL, error });
        }, 1);
    };

    addListener("myTeams", db.collection(`profiles/${ (uid || "") }/teams`).onSnapshot(gotSnapshot, snapShotError));
}


const getCollection = R.curry((Model: any, path: string, dispatchSuccessType: string, dispatchErrorType: string, dispatch: Dispatch<any>) => {

    const snapShot = (querySnapshot: QuerySnapshot) => {
        const data = {};
        querySnapshot.forEach((doc: Object) => {
            data[doc.id] = Model.create(doc.data(), doc.id);
        });
        setTimeout(() => {
            dispatch({ type: dispatchSuccessType, data });
        }, 1);
    };

    const snapShotError = (error: Error) => {
        // eslint-disable-next-line no-console
        console.error(`Error retrieving ${ path } `, error);
        setTimeout(() => {
            dispatch({ type: dispatchErrorType, error });
        }, 1);
    };

    return db.collection(path).get().then(snapShot).catch(snapShotError);

});

// Fetch Trash Drops Data
export const fetchTrashDrops = getCollection(TrashDrop)("trashDrops")(actionTypes.FETCH_TRASH_DROPS_SUCCESS)(actionTypes.FETCH_TRASH_DROPS_SUCCESS);

// Fetch Town Data
export const fetchTowns = getCollection(Town)("towns")(actionTypes.FETCH_TOWN_DATA_SUCCESS)(actionTypes.FETCH_TOWN_DATA_FAIL);

// Fetch TrashCollectionSite Data
export const fetchTrashCollectionSites = getCollection(TrashCollectionSite)("trashCollectionSites")(actionTypes.FETCH_TRASH_COLLECTION_SITES_SUCCESS)(actionTypes.FETCH_TRASH_COLLECTION_SITES_FAIL);


// Fetch Celebrations Data
export const fetchCelebrations = getCollection(Celebration)("celebrations")(actionTypes.FETCH_CELEBRATIONS_SUCCESS)(actionTypes.FETCH_CELEBRATIONS_FAIL);

// Fetch Teams Data
export const fetchTeams = getCollection(Team)("teams")(actionTypes.FETCH_TEAMS_SUCCESS)(actionTypes.FETCH_TEAMS_FAIL);

// Fetch Green Up Event Info
export function fetchEventInfo(dispatch: Dispatch<ActionType>) {
    db.collection("eventInfo").doc("eventSettings").get().then(
        (doc: Object) => {
            if (!doc.exists) {
                throw Error("Failed to retrieve event info");
            }
            dispatch({ type: actionTypes.FETCH_EVENT_INFO_SUCCESS, data: doc.data() });

        }).catch(
        (error: Object) => {
            // eslint-disable-next-line no-console
            console.error("Error getting event info:", JSON.stringify(error));
        }
    );
}

// Fetch SupplyDistributionSite Data
export const fetchSupplyDistributionSites = getCollection(SupplyDistributionSite)("supplyDistributionSites")(actionTypes.FETCH_SUPPLY_DISTRIBUTION_SITES_SUCCESS)(actionTypes.FETCH_SUPPLY_DISTRIBUTION_SITES_FAIL);

function setupUpdatesListener(dispatch: Dispatch<ActionType>) {
    const gotSnapShot = (querySnapshot: QuerySnapshot) => {
        const data = {};
        querySnapshot.forEach((doc: Object) => {
            const updated = (doc.data() || {});
            data[doc.id] = (updated.updated || {}).seconds;
        });
        setTimeout(() => {
            dispatch({ type: actionTypes.FETCH_UPDATES_SUCCESS, data });
        }, 1);
    };

    const snapShotError = (error: Error) => {
        // eslint-disable-next-line no-console
        console.error("Error in setupUpdatesListener: ", error);
        setTimeout(() => {
            dispatch({ type: actionTypes.FETCH_UPDATES_FAIL, error });
        }, 1);
    };
    addListener("updates", db.collection("updates").onSnapshot(gotSnapShot, snapShotError));
}

// Initialize or de-initialize a user
const initializeUser = curry((dispatch: Dispatch<ActionType>, user: UserType) => {
    setupUpdatesListener(dispatch);
    // fetchEventInfo(dispatch);
    setupProfileListener(user, dispatch);
    // setupTrashDropListener(dispatch);
    setupInvitationListener(user.email, dispatch);
    // setupCelebrationsListener(dispatch);
    // setupTownListener(dispatch);
    //  setupTrashCollectionSiteListener(dispatch);
    // setupSupplyDistributionSiteListener(dispatch);
    // setupTeamsListener(user, dispatch);
    setupMessageListener(user.uid, dispatch);
    setupMyTeamsListener(user, dispatch);
    // dispatch({ type: actionTypes.IS_LOGGING_IN_VIA_SSO, isLoggingInViaSSO: false });
});

const deinitializeUser = () => {
    removeAllListeners();
};

/**
 * Sets up a listener that initializes the user after login, or resets app state after a logout.
 * @param {function} dispatch - dispatch function
 * @returns {void}
 */
export function initialize(dispatch: Dispatch<ActionType>) {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        initializeUser(dispatch)(currentUser);
    }

    firebase.auth().onAuthStateChanged((user: Object) => {
        if (Boolean(user)) {
            initializeUser(dispatch)(user);
            dispatch(dataLayerActions.userAuthenticated(User.create(user)));
        } else {
            deinitializeUser();
            dispatch(dataLayerActions.userLoggedOut());
        }
    });
}

/** *************** AUTHENTICATION *************** **/

export function createUser(email: string, password: string, displayName: string, dispatch: Dispatch<ActionType>): Promise<any> {
    return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password).then(
            (response: Object): Promise<any> => createProfile({ ...User.create(response.user), displayName }, dispatch)
        );
}

export function loginWithEmailPassword(_email: string, password: string, dispatch: Dispatch<ActionType>): Promise<any> {
    return firebase
        .auth()
        .signInWithEmailAndPassword(_email, password)
        .then((userInfo: { user: UserType }) => {
            const { uid, email, displayName, photoURL } = userInfo.user;
            db.collection("profiles").doc(uid).get().then(
                (doc: Object) => {
                    if (!doc.exists) {
                        createProfile(User.create({ uid, email, displayName, photoURL }), dispatch);
                    }
                }).catch((error: Error) => {
                // eslint-disable-next-line no-console
                console.error("Error getting document:", error);
            });
        });
}

export function resetPassword(emailAddress: string): Promise<any> {
    return firebase.auth().sendPasswordResetEmail(emailAddress);
}

export function logout(dispatch: Dispatch<ActionType>): Promise<any> {
    removeAllListeners();
    dispatch(dataLayerActions.resetData());
    return firebase.auth().signOut();
}

export function updateEmail(email: string): Promise<any> {
    return firebase.auth().currentUser.updateEmail(email);
}

/** *************** MESSAGING *************** **/

export function sendUserMessage(userId: string, message: MessageType): Promise<any> {
    const _message = deconstruct(stringifyDates(message));
    return db.collection(`messages/${ userId }/messages`).add(_message);
}

export function sendGroupMessage(group: Array<Object>, message: MessageType): Promise<Array<mixed>> {
    const sentMessages = group.map((recipient: UserType): Promise<any> => recipient.uid
        ? sendUserMessage(recipient.uid, deconstruct(message))
        : Promise.reject("Invalid User"));
    return Promise.all(sentMessages);
}

export function sendTeamMessage(teamId: string, message: MessageType): Promise<any> {
    return db.collection(`teams/${ teamId }/messages`).add(deconstruct(message));
}

export function updateMessage(message: MessageType, userId: string): Promise<any> {
    const newMessage = deconstruct({ ...message, sender: { ...message.sender } });
    return db.collection(`messages/${ userId }/messages`).doc(message.id).set(newMessage);
}

export function deleteMessage(userId: string, messageId: string): Promise<any> {
    return db.collection(`messages/${ userId }/messages`).doc(messageId).delete();
}

/** *************** TEAMS *************** **/

export async function createTeam(team: Object = {}, user: ?Object = {}, dispatch: Dispatch<ActionType>): Promise<any> {
    const { uid } = (user || {});
    const myTeam = deconstruct({ ...team, owner: TeamMember.create({ ...user, memberStatus: "OWNER" }) });

    const docRef = await db.collection("teams").add(myTeam);
    // TODO: Refactor to single Promise.all that is returned.
    await Promise.all([
        db.collection(`teams/${ docRef.id }/members`).doc(team.owner.uid).set({ ...team.owner }),
        db.collection(`profiles/${ uid }/teams`).doc(docRef.id).set({ ...myTeam, isMember: true })
    ]);

    setupTeamMemberListener([docRef.id], dispatch);
    setupTeamMessageListener([docRef.id], dispatch);

}

export function saveTeam(team: TeamType): Promise<any> {
    const _team = deconstruct({ ...team, owner: { ...team.owner } });
    return db.collection("teams").doc(team.id).set(_team);
}

export function deleteTeam(teamId: string): Promise<any> {
    return db.collection("teams").doc(teamId).delete();
}

export function saveLocations(locations: Object, teamId: string): Promise<any> {
    return db.collection("teams").doc(teamId).update({ locations: deconstruct({ ...locations }) });
}

export function inviteTeamMember(invitation: Object): Promise<any> {
    const membershipId = invitation.teamMember.email.toLowerCase();
    const team = { ...invitation.team, owner: { ...invitation.team.owner } };
    const sender = { ...invitation.sender };
    const teamMember = { ...invitation.teamMember };
    const invite = { ...invitation, teamMember, team, sender };
    return db
        .collection(`invitations/${ membershipId }/teams`)
        .doc(team.id)
        .set({ ...invite })
        .then(db.collection(`teams/${ team.id }/invitations`).doc(membershipId).set(deconstruct({ ...invitation.teamMember })));
}

export function removeInvitation(teamId: string, email: string): Promise<any> {
    const deleteInvitation = db.collection(`invitations/${ email }/teams`).doc(teamId).delete();
    const deleteTeamRecord = db.collection(`teams/${ teamId }/invitations`).doc(email.toLowerCase().trim()).delete();
    return Promise.all([deleteInvitation, deleteTeamRecord]);
}

export async function addTeamMember(teamId: string, user: Object, status: string = "ACCEPTED", dispatch: Dispatch<ActionType>): Promise<any> {
    const email = user.email.toLowerCase().trim();
    const teamMember = TeamMember.create(Object.assign({}, user, { memberStatus: status }));
    const addToTeam = db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).set(deconstruct(teamMember));
    const removeRequest = db.collection(`teams/${ teamId }/requests`).doc(teamMember.uid).delete();
    const addTeamToProfile = db.collection(`profiles/${ user.uid }/teams`).doc(teamId).set({ isMember: true });
    const results = await Promise.all([addToTeam, addTeamToProfile, removeRequest]).then((): Promise<any> => removeInvitation(teamId, email));
    if (dispatch) { // If dispatch is defined we are adding current user and need to setup listeners. TODO: Fix this hack.
        setupTeamMemberListener([teamId], dispatch);
        setupTeamMessageListener([teamId], dispatch);
    }
    return results;
}

export function updateTeamMember(teamId: string, teamMember: TeamMemberType): Promise<any> {
    return db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).set(deconstruct({ ...teamMember }));
}

export function removeTeamMember(teamId: string, teamMember: UserType): Promise<any> {
    const deleteFromTeam = db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).delete();
    const deleteFromProfile = db.collection(`profiles/${ teamMember.uid || "" }/teams`).doc(teamId).delete();
    return Promise.all([deleteFromTeam, deleteFromProfile]);
}

export function leaveTeam(teamId: string, teamMember: UserType): Promise<any> {
    const teams = { ...teamMember.teams };
    delete teams[teamId];
    const removeMember = db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).delete();
    const removeTeam = db.collection(`profiles/${ teamMember.uid || "" }/teams`).doc(teamId).delete();
    return Promise.all([removeMember, removeTeam]);
}

export function revokeInvitation(teamId: string, membershipId: string): Promise<any> {
    const _membershipId = membershipId.toLowerCase();
    const teamListing = db.collection(`teams/${ teamId }/invitations`).doc(_membershipId).delete();
    const invite = db.collection(`invitations/${ _membershipId }/teams`).doc(teamId).delete();
    return Promise.all([teamListing, invite]);
}

export function addTeamRequest(teamId: string, user: Object): Promise<any> {
    const email = user.email.toLowerCase().trim();
    const teamMember = TeamMember.create(Object.assign({}, user, { memberStatus: teamStatuses.REQUEST_TO_JOIN }));
    const teamRequest = db.collection(`teams/${ teamId }/requests`).doc(user.uid).set(deconstruct(teamMember));
    const addTeamToProfile = db.collection(`profiles/${ user.uid }/teams`).doc(teamId).set({ isMember: false });
    return Promise.all([teamRequest, addTeamToProfile]).then((): Promise<any> => removeInvitation(teamId, email));
}

export function removeTeamRequest(teamId: string, teamMember: UserType): Promise<any> {
    const teams = { ...teamMember.teams };
    delete teams[teamId];
    const delRequest = db.collection(`teams/${ teamId }/requests`).doc(teamMember.uid).delete();
    const delFromProfile = db.collection(`profiles/${ teamMember.uid || "" }/teams/`).doc(teamId).delete();
    return Promise.all([delRequest, delFromProfile]);
}

/** *************** TRASH DROPS *************** **/

export function dropTrash(trashDrop: TrashDrop): Promise<any> {
    return db.collection("trashDrops").add(deconstruct({ ...trashDrop, location: { ...trashDrop.location } }));
}

export function updateTrashDrop(trashDrop: TrashDrop): Promise<any> {
    return db.collection("trashDrops").doc(trashDrop.id).set(deconstruct({
        ...trashDrop,
        location: { ...trashDrop.location }
    }));
}
