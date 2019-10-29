
const   memberStati = require("../constants/team-member-statuses");

const defaultAvatar = "https://firebasestorage.googleapis.com/v0/b/greenupvermont-de02b.appspot.com/o/anonymous.png?alt=media&token=5b617caf-fd05-4508-a820-f9f373b432fa";

class TeamMember {
    uid;
    displayName;
    bio;
    email;
    invitationId;
    memberStatus;
    photoURL;

    constructor(args) {
        this.uid = typeof args.uid === "string" || typeof args.id === "string" || typeof args._id === "string"
            ? args.uid || args.id || args._id
            : null;
        this.displayName = typeof args.displayName === "string"
            ? args.displayName
            : null;
        this.bio = typeof args.bio === "string"
            ? args.bio
            : null;
        this.email = typeof args.email === "string"
            ? args.email.toLowerCase().trim()
            : null;
        this.photoURL = typeof args.photoURL === "string"
            ? args.photoURL
            : defaultAvatar;
        this.memberStatus = typeof args.memberStatus === "string"
            ? args.memberStatus
            : memberStati.NOT_INVITED;
        this.invitationId = typeof args.invitationId === "string"
            ? args.invitationId
            : null;
    }

    static create(args = {}, uid) {
        const _args = { ...args };
        if (Boolean(uid)) {
            _args.uid = uid;
        }
        return new TeamMember(_args);
    }

    static memberStatuses = memberStati;
}

module.exports = TeamMember;