const deconstruct = require("./libs/deconstruct");
const isValidDate = require("./validators").isValidDate;
const Location = require("./location");
const TeamMember = require("./team-member");
const uuid = require("uuid");
const getCurrentGreenUpDay = require("./green-up-day-calucators");
const moment = require("moment");

const defaultDate = moment(getCurrentGreenUpDay()).utc().format("dddd, MMMM Do YYYY");

class Team {

    constructor(args = {}) {
        this.active = typeof args.active === "boolean"
            ? args.active
            : true;
        this.autoAccept = typeof args.autoAccept === "boolean"
            ? args.autoAccept
            : true;
        this.created = isValidDate(args.created)
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
            ? args.locations.map(location => Location.create(location))
            : [];
        this.members = Object.keys(args.members || {})
            .map((key) => TeamMember.create({ ...args.members[key], uid: key }))
            .reduce((obj, member) => ({ ...obj, [member.uid || uuid()]: member }), {});
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

    static create(args = {}, id) {
        const _args = { ...args };
        if (id) {
            _args.id = id;
        }
        return deconstruct(new Team(_args));
    }

}

module.exports = Team;