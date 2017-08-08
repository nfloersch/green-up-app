// @flow

export class UserSummary {
    uid : string;
    userId : string;
    firstName : string;
    lastName : string;
    email : string;

    constructor(args:Object) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string'
            ? args.uid || args.id
            : null;
        this.userId = typeof args.uid === 'string'
            ? args.uid
            : null;
        this.firstName = typeof args.firstName === 'string'
            ? args.name
            : null;
        this.lastName = typeof args.lastName === 'string'
            ? args.name
            : null;
        this.email = typeof args.lastName === 'string'
            ? args.name
            : null;
    }
    static create(args:any) {
        return new UserSummary(args || {});
    }
}
