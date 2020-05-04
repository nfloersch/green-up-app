const deconstruct = require("./libs/deconstruct");
const messageTypes = require("../constants/message-actionTypes");
const isValidDate = require("./validators").isValidDate;
const TeamMember = require("./team-member");

class Message {

    constructor(args) {
        this.id = typeof args.id === "string"
            ? args.id
            : null;
        this.text = typeof args.text === "string"
            ? args.text
            : null;
        this.sender = typeof args.sender === "object"
            ? TeamMember.create(args.sender)
            : null;
        this.teamId = typeof args.teamId === "string"
            ? args.teamId
            : null;
        this.read = typeof args.read === "boolean"
            ? args.read
            : false;
        this.active = typeof args.active === "boolean"
            ? args.active
            : true;
        this.link = typeof args.link === "string"
            ? args.link
            : null;
        this.type = typeof args.type === "string" && args.type in messageTypes
            ? args.type
            : null;
        this.teamName = args.teamName || null;
        this.created = isValidDate(args.created)
            ? new Date(args.created)
            : new Date();
    }

    static create(args = {}) {
        return deconstruct(new Message(args));
    }

    static messageTypes = messageTypes;
}

module.exports = Message;