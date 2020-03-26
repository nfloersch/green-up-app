// @flow
import * as memberStati from "../constants/team-member-statuses";
import { defaultGravatar } from "../libs/avatars";

export default class TeamMember {
    uid: ?string;
    displayName: ?string;
    bio: ?string;
    email: ?string;
    invitationId: ?string;
    memberStatus: ?string;
    photoURL: ?string;

    constructor(args: Object) {
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
            : defaultGravatar;
        this.memberStatus = typeof args.memberStatus === "string"
            ? args.memberStatus
            : memberStati.NOT_INVITED;
        this.invitationId = typeof args.invitationId === "string"
            ? args.invitationId
            : null;
    }

    static create(args: ?Object = {}, uid?: string): TeamMemberType {
        const _args = { ...args };
        if (Boolean(uid)) {
            _args.uid = uid;
        }
        return JSON.parse(JSON.stringify(new TeamMember(_args)));
    }

    static memberStatuses = memberStati;
}
