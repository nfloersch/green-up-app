// @flow

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getEmail(emails) {
    switch (true) {
        case Array.isArray(emails):
            const myEmail = emails.filter(email => !!email && validateEmail(email.email)).map(email => email.email)[0] || null;
            return (typeof myEmail === "string")
                ? myEmail.toLowerCase()
                : myEmail;
        case typeof emails === "string" && validateEmail(emails):
            return emails.toLowerCase();
        default:
            return null;
    }
}

function getPhoneNumber(phoneNumbers) {
    switch (true) {
        case Array.isArray(phoneNumbers):
            return phoneNumbers.filter(phoneNumber => !!phoneNumber).map(phoneNumber => phoneNumber.number)[0] || null;
        case typeof phoneNumbers === "string":
            return phoneNumbers;
        default:
            return null;
    }
}

export default class Contact {
    uid : string;
    firstName : string;
    lastName : string;
    phoneNumber : string;
    email : string;
    isSelected : boolean;

    constructor(args = {}) {
        this.uid = typeof args.uid === "string"
            ? args.uid
            : null;
        this.firstName = typeof args.lastName === "string"
            ? args.firstName
            : null;
        this.lastName = typeof args.lastName === "string"
            ? args.lastName
            : null;
        this.email = getEmail(args.email || args.emails);
        this.phoneNumber = getPhoneNumber(args.phoneNumber || args.phoneNumbers || args.phone);
        this.isSelected = typeof args.isSelected === "boolean"
            ? args.isSelected
            : false;
    }

    static create(args: ?Object, uid?: string) {
        const _args = { ...(args || {}) };
        if (Boolean(uid)) {
            _args.uid = uid;
        }
        return new Contact(_args);
    }
}
