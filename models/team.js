// @flow
import { isValidDate } from "../libs/validators";
import Location from "./location";
import TeamMember from "./team-member";
import uuid from "uuid";
import { getCurrentGreenUpDay } from "../libs/green-up-day-calucators";
import moment from "moment";

const defaultDate = moment(getCurrentGreenUpDay()).utc().format("dddd, MMMM Do YYYY");

export default class Team {
    active: ?boolean;
    created: Date;
    date: ?string;
    description: ?string;
    end: ?string;
    id: ?string;
    isMember: ?boolean;
    isPublic: boolean;
    location: ?string;
    locations: ?Array<LocationType>;
    members: ?Object;
    name: ?string;
    notes: ?Array<string>;
    owner: TeamMemberType;
    start: ?string;
    townId: ?string;

    constructor(args: Object = {}) {
        this.active = typeof args.active === "boolean"
            ? args.active
            : true;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.date = typeof args.date === "string"
            ? args.date
            : defaultDate;
        this.description = typeof args.description === "string"
            ? args.description
            : null;
        this.end = typeof args.end === "string"
            ? args.end
            : null;
        this.id = typeof args.id === "string" ? args.id : null;
        this.isMember = typeof args.isMember === "boolean"
            ? args.isMember
            : false;
        this.isPublic = typeof args.isPublic === "boolean"
            ? args.isPublic
            : true;
        this.name = typeof args.name === "string"
            ? args.name
            : null;
        this.location = typeof args.location === "string"
            ? args.location
            : null;
        this.locations = Array.isArray(args.locations)
            ? args.locations.map((location: Object): LocationType => Location.create(location))
            : [];
        this.members = Object.keys(args.members || {})
            .map((key: string): TeamMemberType => TeamMember.create({ ...args.members[key], uid: key }))
            .reduce((obj: Object, member: TeamMemberType): Object => ({ ...obj, [member.uid || uuid()]: member }), {});
        this.notes = typeof args.notes === "string"
            ? args.notes
            : null;
        this.owner = TeamMember.create(args.owner);
        this.start = typeof args.start === "string"
            ? args.start
            : null;
        this.townId = typeof args.townId === "string"
            ? args.townId
            : null;
    }

    static create(args: Object = {}, id?: string): TeamType {
        const _args = { ...args };
        if (id) {
            _args.id = id;
        }
        return new Team(_args);
    }

}
