const isString = require('./validators').isString;
const constants = require('./constants');
const defaultAvatar = 'https://firebasestorage.googleapis.com/v0/b/greenupvermont-de02b.appspot.com/o/anonymous.png?alt=media&token=5b617caf-fd05-4508-a820-f9f373b432fa';

class TeamMember {

    constructor(args: Object) {
        this.uid = isString(args.uid) || isString(args.id) || isString(args._id)
            ? args.uid || args.id || args._id
            : null;
        this.displayName = isString(args.displayName)
            ? args.displayName
            : null;
        this.bio = isString(args.bio)
            ? args.bio
            : null;
        this.email = isString(args.email)
            ? args.email.toLowerCase().trim()
            : null;
        this.photoURL = isString(args.photoURL)
            ? args.photoURL
            : defaultAvatar;
        this.memberStatus = isString(args.memberStatus)
            ? args.memberStatus
            : constants.teamMemberStatuses.NOT_INVITED;
        this.invitationId = isString(args.invitationId)
            ? args.invitationId
            : null;
    }

    static create(args = {}, uid) {
        const _args = {...args};
        if (uid) {
            _args.uid = uid;
        }
        return  JSON.parse(JSON.stringify(new TeamMember(_args)));
    }

    static memberStatuses = constants.teamMemberStatuses;
}


module.exports =  TeamMember;