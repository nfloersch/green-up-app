const deconstruct = require("./libs/deconstruct");
const validateEmail = require("./validators").isValidEmail;

function getEmail(email) {
    switch (true) {
        case Array.isArray(emails):
            return emails
                .filter((_email) => Boolean(_email) && validateEmail(_email.email))
                .map((_email) => _email.email.toLowerCase())[0] || null;
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
                .filter((phoneNumber) => Boolean(phoneNumber))
                .map(phoneNumber => phoneNumber.number)[0] || null;
        case typeof phoneNumbers === "string":
            return phoneNumbers;
        default:
            return null;
    }
}

class Contact {

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

    static create(args, uid) {
        const _args = { ...(args || { uid: "" }) };
        if (uid) {
            _args.uid = uid;
        }
        return deconstruct(new Contact(_args));
    }
}

module.exports = Contact;