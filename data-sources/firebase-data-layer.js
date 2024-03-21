// @flow

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateProfile as updateProfileFirebase,
    updateEmail as updateEmailFirebase,

} from '@firebase/auth';
import { firebaseAuth, firestore } from "../clients/firebase"
import { collection, doc, onSnapshot, getDoc, updateDoc, setDoc, getDocs, query, addDoc, deleteDoc } from '@firebase/firestore'
import * as dataLayerActions from "./data-layer-actions";
import User from "../models/user";
import TeamMember from "../models/team-member";
import Town from "../models/town";
import Message from "../models/message";
import Invitation from "../models/invitation";
import * as actionTypes from "../constants/action-types";
import { curry } from "ramda";
import * as messageTypes from "../constants/message-types";
import TrashDrop from "../models/trash-drop";
import * as teamStatuses from "../constants/team-member-statuses";
import TrashCollectionSite from "../models/trash-collection-site";
import SupplyDistributionSite from "../models/supply-distribution-site";
import Celebration from "../models/celebration";
import Team from "../models/team";
import * as R from "ramda";
import { defaultGravatar } from "../libs/avatars";

// firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
// const db = getFirestore(firebaseApp)

// Disable deprecated features
// db.settings({});

let myListeners = {};

const deconstruct = (obj: Object): Object => {
    let objAsString = JSON.stringify(obj);
    let objAsObj = JSON.parse(objAsString);
    return objAsObj;
}

const removeListener = (key: string) => {
    if (myListeners[key]) {
        console.log("Removing Listener:", key)
        myListeners[key]();
        delete myListeners[key];
    }
};

const addListener = (key: string, listener: () => void) => {
    if (!key) {
        throw Error("Cannot add listener. Invalid listener key");
    }
    console.log("Adding Listener:", key)
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
    const profilesCollectionRef = collection(firestore, "profiles")
    const userProfileDocRef =  doc(profilesCollectionRef, profile.uid)

    return updateDoc(userProfileDocRef, newProfile).catch((error: Object) => {
        dispatch(dataLayerActions.profileUpdateFail(error));
    })
    // const newProfile = Object.assign({}, profile, { updated: (new Date()).toString() }); // TODO fix this hack right
    // const profileUpdate = db.collection("profiles").doc(profile.uid).update(newProfile);
    // return profileUpdate.catch((error: Object) => {
    //     dispatch(dataLayerActions.profileUpdateFail(error));
    // });
}

function createProfile(user: UserType, dispatch: Dispatch<ActionType>): Promise<any> {
    const now = new Date();
    const newProfile = User.create(user);
    const profilesCollectionRef = collection(firestore, "profiles")
    const userProfileDocRef = doc(profilesCollectionRef, newProfile.uid)

    return setDoc(userProfileDocRef, {
        ...newProfile,
        created: now,
        updated: now
    }).catch((error: Object) => {
        dispatch(dataLayerActions.profileCreateFail(error));
    });

    // const now = new Date();
    // const newProfile = User.create(user);

    // return db.collection("profiles").doc(newProfile.uid).set({
    //     ...newProfile,
    //     created: now,
    //     updated: now
    // }).catch((error: Object) => {
    //     dispatch(dataLayerActions.profileCreateFail(error));
    // });
}

/** *************** INITIALIZATION *************** **/


const setupInvitedTeamMemberListener = (teamIds: Array<string>, dispatch: Dispatch<ActionType>): Array<any> => (teamIds || []).map((teamId) => {
    const teamRef = doc(firestore, `teams/${teamId}`)
    const ref = collection(teamRef, `invitations`);

    const listener = onSnapshot(ref, { next: onSnapshotz, error: onError })


    const onSnapshotz = (querySnapshot: Object) => {
        const data = [];
        querySnapshot.forEach((_doc: Object) => {
            data.push({ ..._doc.data(), id: _doc.id });
        });
        const invitees = data.reduce((obj, member): Object => ({ ...obj, [member.id]: member }), {});
        dispatch(dataLayerActions.inviteesFetchSuccessful(invitees, teamId));
    };
    const onError = ((error: Object | string) => {
        // eslint-disable-next-line no-console
        console.error("setupInvitedTeamMember Error: ", error);
        // TODO : Handle the error
    });

    addListener(`teamMembers_${ teamId }_invitations`, listener);
    // const ref = db.collection(`teams/${ teamId }/invitations`);

    // const onSnapshot = (querySnapshot: Object) => {
    //     const data = [];
    //     querySnapshot.forEach((_doc: Object) => {
    //         data.push({ ..._doc.data(), id: _doc.id });
    //     });
    //     const invitees = data.reduce((obj, member): Object => ({ ...obj, [member.id]: member }), {});
    //     dispatch(dataLayerActions.inviteesFetchSuccessful(invitees, teamId));
    // };
    // const onError = ((error: Object | string) => {
    //     // eslint-disable-next-line no-console
    //     console.error("setupInvitedTeamMember Error: ", error);
    //     // TODO : Handle the error
    // });

    // addListener(`teamMembers_${ teamId }_invitations}`, ref.onSnapshot(onSnapshot, onError));
});

function setupInvitationListener(email: ?string = "", dispatch: Dispatch<ActionType>) {
    const ref = doc(firestore, `/invitations/${ email || "" }`)
    const teamQuery = query(collection(ref, 'teams'))

    const snaphostListener = onSnapshot(teamQuery,
        (querySnapshot) => {
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

    addListener(`invitations_${ email || "" }_teams`, snaphostListener);
    // const ref = db.collection(`/invitations/${ email || "" }/teams`);

    // addListener(`invitations_${ email || "" }_teams`,
    //     ref.onSnapshot(
    //         (querySnapshot: QuerySnapshot) => {
    //             const data = [];
    //             querySnapshot.forEach((doc: Object) => {
    //                 data.push(Invitation.create({ ...doc.data(), id: doc.id }));
    //             });
    //             // this should be an array not an object
    //             const invitations = data.reduce(
    //                 (obj: Object, team: Object): Object => ({
    //                     ...obj,
    //                     [team.id]: team
    //                 }), {});
    //             const messages = Object.values(data).reduce((obj: Object, invite: Object): Object => (
    //                 {
    //                     ...obj, [invite.id]: Message.create({
    //                         id: invite.id,
    //                         text: `${ (invite.sender || {}).displayName } has invited you to join team : ${ (invite.team || {}).name }`,
    //                         sender: invite.sender,
    //                         teamId: (invite.team || {}).id,
    //                         read: false,
    //                         active: true,
    //                         link: null,
    //                         type: messageTypes.INVITATION,
    //                         created: invite.created
    //                     })
    //                 }
    //             ), {});

    //             // Add listeners for new team member list changes
    //             // Object.keys(invitations).forEach(key => {
    //             //     setupInvitedTeamMemberListener(key, dispatch);
    //             // });
    //             dispatch(dataLayerActions.messageFetchSuccessful({ invitations: messages }));
    //             dispatch(dataLayerActions.invitationFetchSuccessful(invitations));
    //         },
    //         ((error: Error) => {
    //             // eslint-disable-next-line no-console
    //             console.error("setupInvitationListener Error", error);
    //             // TODO : Handle the error
    //         })
    //     )
    // );
}

function setupMessageListener(uid: ?string = "", dispatch: Dispatch<ActionType>) {
    const ref = doc(firestore, `messages/${ uid || "" }`)
    const messagesQuery = query(collection(ref, 'messages'))

    const messagesSnapshotListener = onSnapshot(messagesQuery,
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
    );
    addListener(`message_${ uid || "" }_messages`, messagesSnapshotListener)
    // const ref = db.collection(`messages/${ uid || "" }/messages`);

    // addListener(`message_${ uid || "" }_messages`, ref.onSnapshot(
    //     (querySnapshot: QuerySnapshot) => {
    //         const data = [];
    //         querySnapshot.forEach((doc: Object) => {
    //             data.push({ ...doc.data(), id: doc.id });
    //         });
    //         const messages = data.reduce((obj: Object, message: MessageType): Object => ({
    //             ...obj,
    //             [message.id]: Message.create(message)
    //         }), {});
    //         dispatch(dataLayerActions.messageFetchSuccessful({ [uid || ""]: messages }));
    //     },
    //     ((error: Error) => {
    //         // eslint-disable-next-line no-console
    //         console.error("setupMessageListener Error", error);
    //         // TODO : Handle the error
    //     })
    // ));
}

function setupTeamMemberListener(teamIds: Array<string> = [], dispatch: Dispatch<ActionType>) {
    const addTeamMemberListener = (teamId: string) => {
        const teamRef = doc(firestore, `teams/${ teamId }`)
        const membersQuery = query(collection(teamRef, 'members'))

        const memberListener = onSnapshot(membersQuery,
            (querySnapshot) => {
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
        );
        addListener(`team_${ teamId }_members`, memberListener)
    };

    (teamIds || []).forEach((teamId: string) => {
        addTeamMemberListener(teamId);
    });

    // const addTeamMemberListener = (teamId: string) => {
    //     addListener(`team_${ teamId }_members`, db.collection(`teams/${ teamId }/members`)
    //         .onSnapshot(
    //             (querySnapshot: QuerySnapshot) => {
    //                 const data = [];
    //                 querySnapshot.forEach((_doc: Object) => {
    //                     data.push({ ..._doc.data(), id: _doc.id });
    //                 });
    //                 const members = data.reduce((obj: Object, member: TeamMemberType): Object => (
    //                     {
    //                         ...obj,
    //                         [member.uid]: member
    //                     }
    //                 ), {});
    //                 dispatch(dataLayerActions.teamMemberFetchSuccessful(members, teamId));
    //             },
    //             ((error: string | Object) => {
    //                 // eslint-disable-next-line no-console
    //                 console.error("setupTeamMemberListener Error", error);
    //                 // TODO : Handle the error
    //             })
    //         ));
    // };

    // (teamIds || []).forEach((teamId: string) => {
    //     addTeamMemberListener(teamId);
    // });
}

function setupTeamRequestListener(teamIds: Array<string>, dispatch: Dispatch<ActionType>) {
    (teamIds || []).map((teamId: string): void => {

            const teamRef = doc(firestore, `teams/${teamId}`)
            const requestsQuery = query(collection(teamRef, 'requests'))

            const teamRequestListener = onSnapshot(requestsQuery,
                (querySnapshot) => {
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
            addListener(`team_${ teamId }_requests`, teamRequestListener)
            // addListener(`team_${ teamId }_requests`,
            //     db.collection(`teams/${ teamId }/requests`).onSnapshot(
            //         (querySnapshot: QuerySnapshot) => {
            //             const data = [];
            //             querySnapshot.forEach((_doc: Object) => {
            //                 data.push({ ..._doc.data(), id: _doc.id });
            //             });
            //             const members = data.reduce((obj: Object, member: TeamMemberType): Object => ({
            //                 ...obj,
            //                 [member.uid]: member
            //             }), {});
            //             dispatch(dataLayerActions.teamRequestFetchSuccessful(members, teamId));
            //         },
            //         ((error: Error) => {
            //             // eslint-disable-next-line no-console
            //             console.error("setupTeamRequestListener Error", error);
            //             // TODO : Handle the error
            //         })
            //     )
            // )
        }
    );
}

function setupTeamMessageListener(teamIds: Array<string>, dispatch: any => any) {
    (teamIds || []).map((teamId: string) => {
        const teamRef = doc(firestore, `teams/${teamId}`)
        const teamMessageQuery = query(collection(teamRef, 'messages'))

        const teamMessageListener = onSnapshot(teamMessageQuery,
            ((querySnapshot) => {
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
        );
        addListener(`team_${ teamId }_messages`, teamMessageListener)
        // const ref = db.collection(`teams/${ teamId }/messages`);

        // addListener(`team_${ teamId }_messages`, ref.onSnapshot(
        //     ((querySnapshot: QuerySnapshot) => {
        //         const data = [];
        //         querySnapshot.forEach((doc: Object) => {
        //             data.push({ ...doc.data(), id: doc.id });
        //         });
        //         const messages = data.reduce((obj: Object, message: MessageType): Object => (
        //             {
        //                 ...obj,
        //                 [message.id]: Message.create(message)
        //             }
        //         ), {});
        //         dispatch(dataLayerActions.messageFetchSuccessful({ [teamId]: messages }));
        //     }),
        //     ((error: Error) => {
        //         // eslint-disable-next-line no-console
        //         console.error(`setupTeamMessageListener Error for team ${ teamId }`, error);
        //         // TODO : Handle the error
        //     })
        // ));
    });
}

function setupProfileListener(user: UserType, dispatch: Dispatch<ActionType>) {
    const { uid } = user;
    const docRef = doc(firestore, `profiles/${uid}`)

    const gotSnapshot = (doc) => {
        if (doc.exists) {
            const data = doc.data();
            dispatch({ type: actionTypes.FETCH_PROFILE_SUCCESS, data });
        } else {
            // just in case
            createProfile(user, dispatch);
        }
    }

    addListener(`profiles_${ uid || "" }`, onSnapshot(docRef, { next: gotSnapshot}))
    // const { uid } = user;

    // addListener(`profiles_${ uid || "" }`, db.collection("profiles").doc(uid)
    //     .onSnapshot((doc: Object) => {
    //         if (doc.exists) {
    //             const data = doc.data();
    //             dispatch({ type: actionTypes.FETCH_PROFILE_SUCCESS, data });
    //         } else {
    //             // just in case
    //             createProfile(user, dispatch);
    //         }
    //     }));
}

function setupMyTeamsListener(user: UserType, dispatch: Dispatch<ActionType>) {
    const { uid } = user;
    const ref = doc(firestore, `profiles/${ (uid || "") }`)
    const teamsQuery = query(collection(ref, 'teams'))

    const gotSnapshot = (querySnapshot: Object) => {
        const data = [];
        querySnapshot.forEach((doc: Object) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        const myTeams = data.reduce((obj: Object, team: TeamType): Object => ({ ...obj, [team.id]: team }), {});
        dispatch({ type: actionTypes.FETCH_MY_TEAMS_SUCCESS, data: myTeams });
        const joinedTeams = data
            .filter((team: TeamType): boolean => Boolean(team.id && team.isMember))
            .map((team: TeamType): string => (team.id || ""));
        setupTeamMessageListener(joinedTeams, dispatch);
        setupTeamMemberListener(joinedTeams, dispatch);
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

    const myTeamsSnapshotListener = onSnapshot(teamsQuery, { next: gotSnapshot, error: snapShotError })
    addListener("myTeams", myTeamsSnapshotListener);
    // const { uid } = user;

    // const gotSnapshot = (querySnapshot: Object) => {
    //     const data = [];
    //     querySnapshot.forEach((doc: Object) => {
    //         data.push({ ...doc.data(), id: doc.id });
    //     });
    //     const myTeams = data.reduce((obj: Object, team: TeamType): Object => ({ ...obj, [team.id]: team }), {});
    //     dispatch({ type: actionTypes.FETCH_MY_TEAMS_SUCCESS, data: myTeams });
    //     const joinedTeams = data
    //         .filter((team: TeamType): boolean => Boolean(team.id && team.isMember))
    //         .map((team: TeamType): string => (team.id || ""));
    //     setupTeamMessageListener(joinedTeams, dispatch);
    //     setupTeamMemberListener(joinedTeams, dispatch);
    //     // Add additional listeners for team owners
    //     const ownedTeamIds = data
    //         .filter((team: TeamType): boolean => Boolean(team.id && team.owner && team.owner.uid === uid))
    //         .map((team: TeamType): string => (team.id || ""));
    //     setupInvitedTeamMemberListener(ownedTeamIds, dispatch);
    //     setupTeamRequestListener(ownedTeamIds, dispatch);
    // };

    // const snapShotError = (error: Error) => {
    //     // eslint-disable-next-line no-console
    //     console.error("setupMyTeamsListener error", error);
    //     setTimeout(() => {
    //         dispatch({ type: actionTypes.FETCH_MY_TEAMS_FAIL, error });
    //     }, 1);
    // };

    // addListener("myTeams", db.collection(`profiles/${ (uid || "") }/teams`).onSnapshot(gotSnapshot, snapShotError));
}

// Nick added this to explore why trash drop pins did not show up on the map when they were dropped
// while the device was offline. Upon adding this, Nick found that the map started showing dropped pins
// immediatley. So this listener appears to trigger a refresh on state or something. Nick does not
// entirely know why this works, but is presently ok with that.
function setupTrashDropListener(user: UserType, dispatch: Dispatch<ActionType>) {
    const { uid } = user;

    const gotSnapshot = (querySnapshot: Object) => {
        const data = [];
        console.log("trash drop listener - got snapshot");
        querySnapshot.forEach((doc: Object) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        const trashDrops = data.reduce((obj: Object, drop: TrashDropType): Object => ({ ...obj, [drop.id]: drop }), {});
        dispatch({ type: actionTypes.FETCH_TRASH_DROPS_SUCCESS, data: trashDrops });
    };

    const snapShotError = (error: Error) => {
        // eslint-disable-next-line no-console
        console.error("setupTrashDropListener error", error);
        setTimeout(() => {
            dispatch({ type: actionTypes.FETCH_TRASH_DROPS_FAIL, error });
        }, 1);
    };

    const trashDropsQuery = query(collection(firestore, 'trashDrops'));
    const unsubscribe = onSnapshot(trashDropsQuery, gotSnapshot, snapShotError);
    addListener("trashDrops", unsubscribe);

    // addListener("trashDrops", db.collection(`trashDrops`).onSnapshot(gotSnapshot, snapShotError));
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

    console.log('hitting get collection', Model, path)
    const collectionRef = collection(firestore, path)
    getDocs(collectionRef).then(snapShot).catch(snapShotError)

    // return db.collection(path).get().then(snapShot).catch(snapShotError);
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
    getDoc(doc(firestore, "eventInfo", "settings")).then(
        (doc) => {
            if (!doc.exists()) {
                throw Error("Failed to retrieve event info");
            }
            dispatch({ type: actionTypes.FETCH_EVENT_INFO_SUCCESS, data: doc.data() });
        }).catch(
        (error) => {
            // eslint-disable-next-line no-console
            console.error("Error getting event info:", JSON.stringify(error));
        }
    );

    // db.collection("eventInfo").doc("settings").get().then(
    //     (doc: Object) => {
    //         if (!doc.exists) {
    //             throw Error("Failed to retrieve event info");
    //         }
    //         dispatch({ type: actionTypes.FETCH_EVENT_INFO_SUCCESS, data: doc.data() });

    //     }).catch(
    //     (error: Object) => {
    //         // eslint-disable-next-line no-console
    //         console.error("Error getting event info:", JSON.stringify(error));
    //     }
    // );
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
    const updateCollectionRef = collection(firestore, "updates")

    addListener("updates", onSnapshot(updateCollectionRef, { next: gotSnapShot, error: snapShotError}));
    // const gotSnapShot = (querySnapshot: QuerySnapshot) => {
    //     const data = {};
    //     querySnapshot.forEach((doc: Object) => {
    //         const updated = (doc.data() || {});
    //         data[doc.id] = (updated.updated || {}).seconds;
    //     });
    //     setTimeout(() => {
    //         dispatch({ type: actionTypes.FETCH_UPDATES_SUCCESS, data });
    //     }, 1);
    // };

    // const snapShotError = (error: Error) => {
    //     // eslint-disable-next-line no-console
    //     console.error("Error in setupUpdatesListener: ", error);
    //     setTimeout(() => {
    //         dispatch({ type: actionTypes.FETCH_UPDATES_FAIL, error });
    //     }, 1);
    // };
    // addListener("updates", db.collection("updates").onSnapshot(gotSnapShot, snapShotError));
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
    setupTrashDropListener(user, dispatch); // Nick added this as part of trying to get map pins on the map during offline mode.
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
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
        initializeUser(dispatch)(currentUser);
    }

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
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
    const myEmail = (email || "").trim(); // Android adds an extra space on autofill;
    return createUserWithEmailAndPassword(firebaseAuth, myEmail, password).then(
        (response): Promise<any> => {
            createProfile({
                ...User.create(response.user),
                displayName: displayName || response.user.displayName
            }, dispatch);
            return updateProfileFirebase(response.user, {
                displayName: displayName || response.user.displayName,
                photoURL: response.user.photoURL || defaultGravatar
            })
        }
    );
    // const myEmail = (email || "").trim(); // Android adds an extra space on autofill;
    // return firebase
    //     .auth()
    //     .createUserWithEmailAndPassword(myEmail, password).then(
    //         (response: Object): Promise<any> => {
    //             createProfile({
    //                 ...User.create(response.user),
    //                 displayName: displayName || response.user.displayName
    //             }, dispatch);
    //             return response.user.updateProfile({
    //                 displayName: displayName || response.user.displayName,
    //                 photoURL: response.user.photoURL || defaultGravatar
    //             });
    //         }
    //     );
}

export function loginWithEmailPassword(_email: string, password: string, dispatch: Dispatch<ActionType>): Promise<any> {
    const myEmail = (_email || "").trim(); // Android adds an extra space on autofill;
    return signInWithEmailAndPassword(firebaseAuth, myEmail, password)
        .then((userInfo) => {
            const { uid, email, displayName, photoURL } = userInfo.user;
            const docRef = doc(firestore, "profiles", uid)

            getDoc(docRef).then((doc) => {
                if (!doc.exists) {
                    createProfile(User.create({ uid, email, displayName, photoURL }), dispatch);
                }
            }).catch((error: Error) => {
                // eslint-disable-next-line no-console
                console.error("Error getting document:", error);
            })
        });

    // const myEmail = (_email || "").trim(); // Android adds an extra space on autofill;
    // return firebase
    //     .auth()
    //     .signInWithEmailAndPassword(myEmail, password)
    //     .then((userInfo: { user: UserType }) => {
    //         const { uid, email, displayName, photoURL } = userInfo.user;
    //         db.collection("profiles").doc(uid).get().then(
    //             (doc: Object) => {
    //                 if (!doc.exists) {
    //                     createProfile(User.create({ uid, email, displayName, photoURL }), dispatch);
    //                 }
    //             }).catch((error: Error) => {
    //             // eslint-disable-next-line no-console
    //             console.error("Error getting document:", error);
    //         });
    //     });
}

export function resetPassword(emailAddress: string): Promise<any> {
    return sendPasswordResetEmail(firebaseAuth, emailAddress);
}

export function logout(dispatch: Dispatch<ActionType>): Promise<any> {
    removeAllListeners();
    dispatch(dataLayerActions.resetData());
    return firebaseAuth.signOut();
}

export function updateEmail(email: string): Promise<any> {
    return updateEmailFirebase(firebaseAuth.currentUser, email)
}

/** *************** MESSAGING *************** **/

export function sendUserMessage(userId: string, message: MessageType): Promise<any> {
    const _message = deconstruct(stringifyDates(message));
    const messagesCollection = collection(firestore, `messages/${userId}/messages`);
    return addDoc(messagesCollection, _message);

    // const _message = deconstruct(stringifyDates(message));
    // return db.collection(`messages/${ userId }/messages`).add(_message);
}

export function sendGroupMessage(group: Array<Object>, message: MessageType): Promise<Array<mixed>> {
    const sentMessages = group.map((recipient: UserType): Promise<any> => recipient.uid
        ? sendUserMessage(recipient.uid, deconstruct(message))
        : Promise.reject("Invalid User"));
    return Promise.all(sentMessages);
}

export function sendTeamMessage(teamId: string, message: MessageType): Promise<any> {
    const messagesCollection = collection(firestore, `teams/${teamId}/messages`);
    return addDoc(messagesCollection, deconstruct(message));

    // return db.collection(`teams/${ teamId }/messages`).add(deconstruct(message));
}

export function updateMessage(message: MessageType, userId: string): Promise<any> {
    const newMessage = deconstruct({ ...message, sender: { ...message.sender } });
    const messageDoc = doc(firestore, `messages/${userId}/messages`, message.id);
    return setDoc(messageDoc, newMessage);
    // const newMessage = deconstruct({ ...message, sender: { ...message.sender } });
    // return db.collection(`messages/${ userId }/messages`).doc(message.id).set(newMessage);
}

export function deleteMessage(userId: string, messageId: string): Promise<any> {
    const messageDoc = doc(firestore, `messages/${userId}/messages`, messageId);
    return deleteDoc(messageDoc);
    // return db.collection(`messages/${ userId }/messages`).doc(messageId).delete();
}

/** *************** TEAMS *************** **/

export async function createTeam(team: Object = {}, user: ?Object = {}, dispatch: Dispatch<ActionType>): Promise<any> {
    const { uid } = (user || {});
    const owner = TeamMember.create({ ...user, memberStatus: "OWNER" });
    const myTeam = deconstruct({ ...team, owner });

    const collectionRef = collection(firestore, "teams");
    const docRef = await addDoc(collectionRef, myTeam);

    // TODO: Refactor to single Promise.all that is returned.
    await Promise.all([
        setDoc(doc(firestore, `teams/${ docRef.id }/members`, owner.uid), owner),
        // db.collection(`teams/${ docRef.id }/members`).doc(owner.uid).set(owner),
        setDoc(doc(firestore, `profiles/${ uid }/teams`, docRef.id), { ...myTeam, isMember: true })
        // db.collection(`profiles/${ uid }/teams`).doc(docRef.id).set({ ...myTeam, isMember: true })
    ]);

    setupTeamMemberListener([docRef.id], dispatch);
    setupTeamMessageListener([docRef.id], dispatch);

    // const { uid } = (user || {});
    // const owner = TeamMember.create({ ...user, memberStatus: "OWNER" });
    // const myTeam = deconstruct({ ...team, owner });

    // const docRef = await db.collection("teams").add(myTeam);
    // // TODO: Refactor to single Promise.all that is returned.
    // await Promise.all([
    //     db.collection(`teams/${ docRef.id }/members`).doc(owner.uid).set(owner),
    //     db.collection(`profiles/${ uid }/teams`).doc(docRef.id).set({ ...myTeam, isMember: true })
    // ]);

    // setupTeamMemberListener([docRef.id], dispatch);
    // setupTeamMessageListener([docRef.id], dispatch);

}

export function saveTeam(team: TeamType): Promise<any> {
    const _team = deconstruct({ ...team, owner: { ...team.owner } });
    return setDoc(doc(firestore, `teams/${ team.id }`, docRef.id), _team)
    // return db.collection("teams").doc(team.id).set(_team);
}

export function deleteTeam(teamId: string): Promise<any> {

    let members = [];
    const getTeamsRef = collection(db, `teams/${teamId}/members`);
    getDocs(getTeamsRef).then(
        // const getTeamsRef = db.collection(`teams/${ teamId }/members`);
        // const getTeams = getTeamsRef.get().then(
        (snapshot) => {
            snapshot.forEach(
                (doc) => {
                    console.log(doc.data());
                    removeTeamMember(teamId, doc.data());
                }
            ).catch((error) => {
                console.log("ForEach error: " + error);
            })
        }
    ).catch(
        (error) => {
            console.log("error: " + error);
        }
    );
    // return new Promise(function(r) {
    //     setTimeout(() => { r('blah'); }, 2000);
    //   });
    return deleteDoc(doc(firestore, "teams", teamId));
    // return db.collection("teams").doc(teamId).delete();
}

export function saveLocations(locations: Object, teamId: string): Promise<any> {
    const teamDoc = doc(firestore, "teams", teamId);
    return updateDoc(teamDoc, { locations: deconstruct({ ...locations }) });

    // return db.collection("teams").doc(teamId).update({ locations: deconstruct({ ...locations }) });
}

export function inviteTeamMember(invitation: Object): Promise<any> {
    const membershipId = invitation.teamMember.email.toLowerCase();
    const team = { ...invitation.team, owner: { ...invitation.team.owner } };
    const sender = { ...invitation.sender };
    const teamMember = { ...invitation.teamMember };
    const invite = { ...invitation, teamMember, team, sender };

    const invitationDoc = doc(firestore, `invitations/${membershipId}/teams`, team.id);
    const setInvitation = setDoc(invitationDoc, { ...invite });

    const teamInvitationDoc = doc(firestore, `teams/${team.id}/invitations`, membershipId);
    const setTeamInvitation = setDoc(teamInvitationDoc, deconstruct({ ...invitation.teamMember }));

    return Promise.all([setInvitation, setTeamInvitation]);

    // const membershipId = invitation.teamMember.email.toLowerCase();
    // const team = { ...invitation.team, owner: { ...invitation.team.owner } };
    // const sender = { ...invitation.sender };
    // const teamMember = { ...invitation.teamMember };
    // const invite = { ...invitation, teamMember, team, sender };
    // return db
    //     .collection(`invitations/${ membershipId }/teams`)
    //     .doc(team.id)
    //     .set({ ...invite })
    //     .then(db.collection(`teams/${ team.id }/invitations`).doc(membershipId).set(deconstruct({ ...invitation.teamMember })));
}

export function removeInvitation(teamId: string, email: string): Promise<any> {
    const emailLower = email.toLowerCase().trim();
    const deleteInvitation = deleteDoc(doc(firestore, `invitations/${emailLower}/teams`, teamId));
    const deleteTeamRecord = deleteDoc(doc(firestore, `teams/${teamId}/invitations`, emailLower));
    return Promise.all([deleteInvitation, deleteTeamRecord]);

    // const deleteInvitation = db.collection(`invitations/${ email }/teams`).doc(teamId).delete();
    // const deleteTeamRecord = db.collection(`teams/${ teamId }/invitations`).doc(email.toLowerCase().trim()).delete();
    // return Promise.all([deleteInvitation, deleteTeamRecord]);
}

export async function addTeamMember(teamId: string, user: Object, status: string = "ACCEPTED", dispatch: Dispatch<ActionType>): Promise<any> {
    const email = user.email.toLowerCase().trim();
    const teamMember = TeamMember.create(Object.assign({}, user, { memberStatus: status }));

    const teamMemberDoc = doc(firestore, `teams/${teamId}/members`, teamMember.uid);
    const addToTeam = setDoc(teamMemberDoc, teamMember).then(
        (val) => {
            console.log("value: " + val);
        }
    ).catch((error) => {
        console.log("Error adding team member:", error);
    });

    const myteamRef = doc(firestore, 'teams', teamId);
    let myteam = null;
    const getTeam = getDoc(myteamRef).then(
        (doc) => {
            if (doc.exists()) {
                console.log("Document data:", doc.data());
                myteam = doc.data();
            } else {
// doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }
    ).catch((error) => {
        console.log("Error getting document:", error);
    });

    const removeRequestDoc = doc(firestore, `teams/${teamId}/requests`, teamMember.uid);
    const removeRequest = deleteDoc(removeRequestDoc);

    const profileDoc = doc(firestore, `profiles/${user.uid}/teams`, teamId);
    const addTeamToProfile = setDoc(profileDoc, { ...myteam, isMember: true });

    const results = await Promise.all([addTeamToProfile, removeRequest]).then((): Promise<any> => removeInvitation(teamId, email));

    if (dispatch) { // If dispatch is defined we are adding current user and need to setup listeners. TODO: Fix this hack.
        setupTeamMemberListener([teamId], dispatch);
        setupTeamMessageListener([teamId], dispatch);
    }

    return results;
    // const collRef = db.collection('teams');
    // const myteamRef = collRef.doc(teamId);
    // let myteam = null;
    // const email = user.email.toLowerCase().trim();
    // const teamMember = TeamMember.create(Object.assign({}, user, { memberStatus: status }));
    // const addToTeam = await db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).set(teamMember).then(
    //     (val) => {
    //         console.log("value: " + val);
    //     }
    // ).catch((error) => {
    //     console.log("Error adding team member:", error);
    // });
    // const getTeam = await myteamRef.get().then(
    //     (doc) => {
    //         if (doc.exists) {
    //                 console.log("Document data:", doc.data());
    //                 myteam = doc.data();

    //         } else {
    //             // doc.data() will be undefined in this case
    //             console.log("No such document!");
    //         }
    //     }
    // ).catch((error) => {
    //     console.log("Error getting document:", error);
    // });
    // const removeRequest = db.collection(`teams/${ teamId }/requests`).doc(teamMember.uid).delete();
    // const addTeamToProfile = db.collection(`profiles/${ user.uid }/teams`).doc(teamId).set({ ...myteam, isMember: true });
    // const results = await Promise.all([addTeamToProfile, removeRequest]).then((): Promise<any> => removeInvitation(teamId, email));
    // if (dispatch) { // If dispatch is defined we are adding current user and need to setup listeners. TODO: Fix this hack.
    //     setupTeamMemberListener([teamId], dispatch);
    //     setupTeamMessageListener([teamId], dispatch);
    // }
    // return results;
}

export function updateTeamMember(teamId: string, teamMember: TeamMemberType): Promise<any> {
    return db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).set(deconstruct({ ...teamMember }));
}

export function removeTeamMember(teamId: string, teamMember: UserType): Promise<any> {
    console.log("Removed Team Member " + teamMember.uid + " from team " + teamId);
    const deleteFromTeam = db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).delete();
    const deleteFromProfile = db.collection(`profiles/${ teamMember.uid || "" }/teams`).doc(teamId).delete();
    return Promise.all([deleteFromTeam, deleteFromProfile]);
    return new Promise(function(r) {
        setTimeout(() => { r('blah'); }, 2000);
    });; // db.collection("teams").doc(teamId).delete();
}

export function leaveTeam(teamId: string, teamMember: UserType): Promise<any> {
    const teams = { ...teamMember.teams };
    delete teams[teamId];
    const memberDoc = doc(firestore, `teams/${teamId}/members`, teamMember.uid);
    const removeMember = deleteDoc(memberDoc);
    const teamDoc = doc(firestore, `profiles/${teamMember.uid || ""}/teams`, teamId);
    const removeTeam = deleteDoc(teamDoc);
    return Promise.all([removeMember, removeTeam]);

    // const teams = { ...teamMember.teams };
    // delete teams[teamId];
    // const removeMember = db.collection(`teams/${ teamId }/members`).doc(teamMember.uid).delete();
    // const removeTeam = db.collection(`profiles/${ teamMember.uid || "" }/teams`).doc(teamId).delete();
    // return Promise.all([removeMember, removeTeam]);
}

export function revokeInvitation(teamId: string, membershipId: string): Promise<any> {
    const _membershipId = membershipId.toLowerCase();
    const teamListing = deleteDoc(doc(firestore, `teams/${teamId}/invitations`, _membershipId));
    const invite = deleteDoc(doc(firestore, `invitations/${_membershipId}/teams`, teamId));
    return Promise.all([teamListing, invite]);
    // const _membershipId = membershipId.toLowerCase();
    // const teamListing = db.collection(`teams/${ teamId }/invitations`).doc(_membershipId).delete();
    // const invite = db.collection(`invitations/${ _membershipId }/teams`).doc(teamId).delete();
    // return Promise.all([teamListing, invite]);
}

export function addTeamRequest(teamId: string, user: Object): Promise<any> {
    const email = user.email.toLowerCase().trim();
    const teamMember = TeamMember.create(Object.assign({}, user, { memberStatus: teamStatuses.REQUEST_TO_JOIN }));
    const teamRequestDoc = doc(firestore, `teams/${teamId}/requests`, user.uid);
    const teamRequest = setDoc(teamRequestDoc, deconstruct(teamMember));
    const profileDoc = doc(firestore, `profiles/${user.uid}/teams`, teamId);
    const addTeamToProfile = setDoc(profileDoc, { isMember: false });
    return Promise.all([teamRequest, addTeamToProfile]).then((): Promise<any> => removeInvitation(teamId, email));

    // const email = user.email.toLowerCase().trim();
    // const teamMember = TeamMember.create(Object.assign({}, user, { memberStatus: teamStatuses.REQUEST_TO_JOIN }));
    // const teamRequest = db.collection(`teams/${ teamId }/requests`).doc(user.uid).set(deconstruct(teamMember));
    // const addTeamToProfile = db.collection(`profiles/${ user.uid }/teams`).doc(teamId).set({ isMember: false });
    // return Promise.all([teamRequest, addTeamToProfile]).then((): Promise<any> => removeInvitation(teamId, email));
}

export function removeTeamRequest(teamId: string, teamMember: UserType): Promise<any> {
    const teams = { ...teamMember.teams };
    delete teams[teamId];
    const teamRequestDoc = doc(firestore, `teams/${teamId}/requests`, teamMember.uid);
    const delRequest = deleteDoc(teamRequestDoc);
    const profileDoc = doc(firestore, `profiles/${teamMember.uid || ""}/teams`, teamId);
    const delFromProfile = deleteDoc(profileDoc);
    return Promise.all([delRequest, delFromProfile]);

    // const teams = { ...teamMember.teams };
    // delete teams[teamId];
    // const delRequest = db.collection(`teams/${ teamId }/requests`).doc(teamMember.uid).delete();
    // const delFromProfile = db.collection(`profiles/${ teamMember.uid || "" }/teams/`).doc(teamId).delete();
    // return Promise.all([delRequest, delFromProfile]);
}

/** *************** TRASH DROPS *************** **/

export function dropTrash(trashDrop: TrashDrop): Promise<any> {
    let newDrop = deconstruct(
        {
            ...trashDrop,
            location: {
                ...trashDrop.location
            }
        }
    );

    return addDoc(collection(firestore, "trashDrops"), newDrop);
    // return db.collection("trashDrops").add(newDrop);
}

export function updateTrashDrop(trashDrop: TrashDrop): Promise<any> {
    return setDoc(doc(firestore, "trashDrops", trashDrop.id), deconstruct({
        ...trashDrop,
        location: { ...trashDrop.location }
    }));

    // return db.collection("trashDrops").doc(trashDrop.id).set(deconstruct({
    //     ...trashDrop,
    //     location: { ...trashDrop.location }
    // }));
}

export function removeTrashDrop(trashDrop: TrashDrop): Promise<any> {
    return deleteDoc(doc(firestore, "trashDrops", trashDrop.id));
    // return db.collection("trashDrops").doc(trashDrop.id).delete();
}