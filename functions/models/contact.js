// @flow
/* global require */

const validators = require('./validators');

function getEmail(emails) {
    const myEmail = emails.filter(email => Boolean(email) && validators.isValidEmail(email.email)).map(email => email.email)[0] || null;
    switch (true) {
        case Array.isArray(emails):
            return (validators.isString(myEmail))
                ? myEmail.toLowerCase()
                : myEmail;
        case typeof emails === 'string' && validators.isValidEmail(emails):
            return emails.toLowerCase();
        default:
            return null;
    }
}

function getPhoneNumber(phoneNumbers) {
    switch (true) {
        case Array.isArray(phoneNumbers):
            return phoneNumbers.filter(phoneNumber => Boolean(phoneNumber)).map(phoneNumber => phoneNumber.number)[0] || null;
        case validators.isString(phoneNumbers):
            return phoneNumbers;
        default:
            return null;
    }
}

class Contact {
    uid: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    isSelected: boolean;

    constructor(args = {}) {
        this.uid = validators.isString(args.uid)
            ? args.uid
            : null;
        this.firstName = validators.isString(args.lastName)
            ? args.firstName
            : null;
        this.lastName = validators.isString(args.lastName)
            ? args.lastName
            : null;
        this.email = getEmail(args.email || args.emails);
        this.phoneNumber = getPhoneNumber(args.phoneNumber || args.phoneNumbers || args.phone);
        this.isSelected = typeof args.isSelected === 'boolean'
            ? args.isSelected
            : false;
    }

    static create(args: ?Object, uid?: string) {
        const _args = {...(args || {})};
        if (uid) {
            _args.uid = uid;
        }
        return JSON.parse(JSON.stringify(new Contact(_args)));
    }
}

module.exports =  Contact;