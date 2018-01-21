// @flow


const memberStati = {
    INVITED: 'INVITED',
    ACCEPTED: 'ACCEPTED',
    DECLINED: 'DECLINED',
    NOT_INVITED: 'NOT_INVITED',
    MEMBERSHIP_REQUESTED: 'MEMBERSHIP_REQUESTED'
};

export class TeamMember {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    memberStatus: string;
    phone: string;

    constructor(args: Object) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string' || typeof args._id === 'string'
            ? args.uid || args.id || args._id
            : null;
        this.firstName = typeof args.firstName === 'string'
            ? args.firstName
            : null;
        this.lastName = typeof args.lastName === 'string'
            ? args.lastName
            : null;
        this.email = typeof args.email === 'string'
            ? args.email
            : null;
        this.phone = typeof args.phone === 'string'
            ? args.phone
            : null;
        this.memberStatus = typeof args.memberStatus === 'string'
            ? args.memberStatus
            : memberStati.NOT_INVITED;
    }

    static create(args: any) {
        return new TeamMember(args || {});
    }

    static memberStatuses = memberStati;
}
