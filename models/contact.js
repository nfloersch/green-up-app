// @flow

function validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function getEmail(emails: any): ?string {
    switch (true) {
        case Array.isArray(emails):
            const myEmail = emails
                .filter((email: Object): boolean => !!email && validateEmail(email.email))
                .map((email: Object): ?string => email.email)[0] || null;
            return (typeof myEmail === "string")
                ? myEmail.toLowerCase()
                : myEmail;
        case typeof emails === "string" && validateEmail(emails):
            return emails.toLowerCase();
        default:
            return null;
    }
}

function getPhoneNumber(phoneNumbers: any): ?string {
    switch (true) {
        case Array.isArray(phoneNumbers):
            return phoneNumbers
                .filter((phoneNumber: Object): boolean => !!phoneNumber)
                .map((phoneNumber: Object): Array<string> => phoneNumber.number)[0] || null;
        case typeof phoneNumbers === "string":
            return phoneNumbers;
        default:
            return null;
    }
}

export default class Contact {
    uid: ?string;
    firstName: ?string;
    lastName: ?string;
    phoneNumber: ?string;
    email: ?string;
    isSelected: boolean;

    constructor(args: Object = {}) {
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

    static create(args: ?Object, uid?: string): ContactType {
        const _args = { ...(args || { uid: "" }) };
        if (Boolean(uid)) {
            _args.uid = uid;
        }
        return new Contact(_args);
    }
}
