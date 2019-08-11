// @flow

const validators = require('./validators');
const md5 = require('md5-hash');

const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/greenupvermont-de02b.appspot.com/o/anonymous.png?alt=media&token=5b617caf-fd05-4508-a820-f9f373b432fa';
const getGravatar = (email: string) => (!email ? defaultAvatar : `https://www.gravatar.com/avatar/${md5(email.trim().toLowerCase())}?d=mm`);

class User {
    uid: ?string;
    displayName: ?string;
    updated: ?Date;
    email: ?string;
    photoURL: ?string;
    teams: ?Object;
    bio: ?string;
    created: ?Date;
    grantMarketingConsent: ?Boolean;

    constructor(args: Object = {}) {
        this.uid = validators.isString(args.uid) || validators.isString(args.id)
            ? args.uid || args.id
            : null;
        this.displayName = validators.isString(args.displayName)
            ? args.displayName.trim()
            : null;
        this.email = validators.isString(args.email)
            ? args.email.trim().toLowerCase()
            : null;
        this.bio = validators.isString(args.bio)
            ? args.bio.slice(0, 144).trim() // max-length is 144 characters
            : null;
        this.created = validators.isValidDate(args.created)
            ? new Date(args.created)
            : null;
        this.updated = validators.isValidDate(new Date(args.updated))
            ? new Date(args.updated)
            : null;
        this.teams = args.teams || {};
        this.photoURL = validators.isString(args.photoURL)
            ? args.photoURL
            : getGravatar(args.email);
        this.grantMarketingConsent = typeof args.grantMarketingConsent === 'boolean'
            ? args.grantMarketingConsent
            : null;
        this.marketingConsentUpdatedOn = args.marketingConsentUpdatedOn || null;
    }

    static create(args: ?Object, uid?: string) {
        const _args = JSON.parse(JSON.stringify(args));
        if (uid) {
            _args.uid = uid;
        }
        return JSON.parse(JSON.stringify(new User(_args)));
    }
}

module.exports = User;