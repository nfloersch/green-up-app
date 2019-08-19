// @flow
import { isValidDate } from "../libs/validators";
import Location from "./location";
import TeamMember from "./team-member";
import uuid from "uuid";
import { getCurrentGreenUpDay } from "../libs/green-up-day-calucators";
import moment from "moment";

const defaultDate = moment(getCurrentGreenUpDay()).utc().format("dddd, MMMM Do YYYY");

export default class Team {
    id: ?string;
    name: ?string;
    description: ?string;
    notes: ?Array<string>;
    town: ?string;
    location: ?string;
    date: ?string;
    start: ?string;
    end: ?string;
    active: ?boolean;
    members: ?Object;
    locations: ?Array<Location>;
    isPublic: boolean;
    created: Date;
    owner: TeamMember;

    constructor(args: Object = {}) {
        this.id = typeof args.id === "string" ? args.id : null;
        this.name = typeof args.name === "string"
            ? args.name
            : null;
        this.town = typeof args.town === "string"
            ? args.town
            : null;
        this.location = typeof args.location === "string"
            ? args.location
            : null;
        this.description = typeof args.description === "string"
            ? args.description
            : null;
        this.notes = typeof args.notes === "string"
            ? args.notes
            : null;
        this.date = typeof args.date === "string"
            ? args.date
            : defaultDate;
        this.start = typeof args.start === "string"
            ? args.start
            : null;
        this.end = typeof args.end === "string"
            ? args.end
            : null;
        this.active = typeof args.active === "boolean"
            ? args.active
            : true;
        this.locations = Array.isArray(args.locations)
            ? args.locations.map((location) => Location.create(location))
            : [];
        this.isPublic = typeof args.isPublic === "boolean"
            ? args.isPublic
            : true;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
        this.owner = TeamMember.create(args.owner);
        this.members = Object.keys(args.members || {})
            .map(key => TeamMember.create({ ...args.members[key], uid: key }))
            .reduce((obj, member) => ({ ...obj, [member.uid || uuid()]: member }), {});
    }

    static create(args: Object = {}, id?: string) {
        const _args = { ...args };
        if (id) {
            _args.id = id;
        }
        return new Team(_args);
    }

}
