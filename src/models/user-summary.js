// @flow

export class UserSummary {
    uid : string;
    userId : string;
    firstName : string;
    lastName : string;
    email : string;

    constructor(args:Object) {
        this.uid = typeof args.uid === 'string' || typeof args.id === 'string' || typeof args._id === 'string'
            ? args.uid || args.id ||  args._id
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
    }
    static create(args:any) {
        return new UserSummary(args || {});
    }
}
