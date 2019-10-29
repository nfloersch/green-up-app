const validateEmail = require('./validators').isValidEmail;

function getEmail(email) {
    switch (true) {
        case Array.isArray(emails):
            const myEmail = emails
                .filter((email) => !!email && validateEmail(email.email))
                .map((email) => email.email)[0] || null;
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
            return phoneNumbers
                .filter((phoneNumber) => !!phoneNumber)
                .map((phoneNumber): Array<string> => phoneNumber.number)[0] || null;
        case typeof phoneNumbers === "string":
            return phoneNumbers;
        default:
            return null;
    }
}

class Contact {
    uid;
    firstName;
    lastName;
    phoneNumber;
    email;
    isSelected;

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

    static create(args, uid): ContactType {
        const _args = { ...(args || { uid: "" }) };
        if (Boolean(uid)) {
            _args.uid = uid;
        }
        return new Contact(_args);
    }
}

module.exports = Contact;