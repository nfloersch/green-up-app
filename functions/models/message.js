const constants = require('./constants');
const {isString, isValidDate} = require('./validators');
const TeamMember = require('./team-member');

class Message {
    constructor(args) {
        this.id = isString(args.id)
            ? args.id
            : null;
        this.text = isString(args.text)
            ? args.text
            : null;
        this.sender = typeof args.sender === 'object'
            ? TeamMember.create(args.sender)
            : null;
        this.teamId = isString(args.teamId)
            ? args.teamId
            : null;
        this.read = typeof args.read === 'boolean'
            ? args.read
            : false;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
        this.link = isString(args.link)
            ? args.link
            : null;
        this.type = isString(args.type) && args.type in constants.messageTypes
            ? args.type
            : null;
        this.teamName = args.teamName || null;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
    }

    static create(args = {}, id) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return JSON.parse(JSON.stringify(new Message(_args)));
    }

    static messageTypes = constants.messageTypes;
}

module.exports = Message;