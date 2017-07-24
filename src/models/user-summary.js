// @flow

export class UserSummary {
    _id : string;
    userId : string;
    firstName : string;
    lastName : string;
    email : string;

    constructor(args = {}) {
        this._id = typeof args._id === 'string'
            ? args._id
            : null;
        this.userId = typeof args._id === 'string'
            ? args._id
            : null;
        this.firstName = typeof args.firrtName === 'string'
            ? args.name
            : null;
        this.lastName = typeof args.lastName === 'string'
            ? args.name
            : null;
        this.email = typeof args.lastName === 'string'
            ? args.name
            : null;
    }
    static create(args) {
        return new UserSummary(args);
    }
}
