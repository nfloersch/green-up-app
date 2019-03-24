// @flow


import TeamMember from '../../models/team-member';
import Invitation from '../../models/invitation';
import * as firebaseDataLayer from '../../data-sources/firebase-data-layer';
import {Alert} from 'react-native';


export function inviteContacts(team: Object, currentUser: Object, teamMembers: [TeamMember]) {
    return async function () {
        teamMembers.forEach(teamMember => {
            const invitation = Invitation.create({team, sender: currentUser, teamMember});
            firebaseDataLayer.inviteTeamMember(invitation).catch(err => {
                Alert.alert(err);
                throw err;
            });
        });
    };
}
