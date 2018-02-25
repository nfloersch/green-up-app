// @flow

const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/greenupvermont-de02b.appspot.com/o/anonymous.png?alt=media&token=5b617caf-fd05-4508-a820-f9f373b432fa';

const memberStati = {
    INVITED: 'INVITED',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    NOT_INVITED: 'NOT_INVITED',
    MEMBERSHIP_REQUESTED: 'MEMBERSHIP_REQUESTED'
};

export class TeamMember {
    uid: string;
    displayName: string;
    bio: string;
    email: string;
    memberStatus: string;
    photoURL: string;

    constructor(args: Object) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string' || typeof args._id === 'string'
            ? args.uid || args.id || args._id
            : null;
        this.displayName = typeof args.displayName === 'string'
            ? args.displayName
            : null;
        this.bio = typeof args.bio === 'string'
            ? args.bio
            : null;
        this.email = typeof args.email === 'string'
            ? args.email
            : null;
        this.photoURL = typeof args.photoURL === 'string'
            ? args.photoURL
            : defaultAvatar;
        this.memberStatus = typeof args.memberStatus === 'string'
            ? args.memberStatus
            : memberStati.NOT_INVITED;
    }

    static create(args: any) {
        return new TeamMember(args || {});
    }

    static memberStatuses = memberStati;
}
