/* global require */

const { isString, isValidEmail } = require('./validators');

function getEmail(emails) {
    const myEmail = emails.filter(email => Boolean(email) && isValidEmail(email.email)).map(email => email.email)[0] || null;
    switch (true) {
        case Array.isArray(emails):
            return (isString(myEmail))
                ? myEmail.toLowerCase()
                : myEmail;
        case isString(emails) && isValidEmail(emails):
            return emails.toLowerCase();
        default:
            return null;
    }
}

function getPhoneNumber(phoneNumbers) {
    switch (true) {
        case Array.isArray(phoneNumbers):
            return phoneNumbers.filter(phoneNumber => Boolean(phoneNumber)).map(phoneNumber => phoneNumber.number)[0] || null;
        case isString(phoneNumbers):
            return phoneNumbers;
        default:
            return null;
    }
}

class Contact {
    constructor(args = {}) {
        this.uid = isString(args.uid)
            ? args.uid
            : null;
        this.firstName = isString(args.lastName)
            ? args.firstName
            : null;
        this.lastName = isString(args.lastName)
            ? args.lastName
            : null;
        this.email = getEmail(args.email || args.emails);
        this.phoneNumber = getPhoneNumber(args.phoneNumber || args.phoneNumbers || args.phone);
        this.isSelected = typeof args.isSelected === 'boolean'
            ? args.isSelected
            : false;
    }

    static create(args, uid) {
        const _args = { ...(args || {}) };
        if (uid) {
            _args.uid = uid;
        }
        return JSON.parse(JSON.stringify(new Contact(_args)));
    }
}

module.exports = Contact;