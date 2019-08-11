// @flow

const constants  =  require('./constants');
const validators = require('./validators');
const TeamMember = require('./team-member');

class Message {
    id: ?string;
    text: ?string;
    sender: ?TeamMember;
    teamId: ?string;
    read: ?boolean;
    active: ?boolean;
    link: ?string;
    type: ?string;
    created: ?Date;
    teamName: ?string;

    constructor(args: Object) {
        this.id = validators.isString(args.id)
            ? args.id
            : null;
        this.text = validators.isString(args.text)
            ? args.text
            : null;
        this.sender = typeof args.sender === 'object'
            ? TeamMember.create(args.sender)
            : null;
        this.teamId = validators.isString(args.teamId)
            ? args.teamId
            : null;
        this.read = typeof args.read === 'boolean'
            ? args.read
            : false;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
        this.link = validators.isString(args.link)
            ? args.link
            : null;
        this.type = validators.isString(args.type) && args.type in constants.messageTypes
            ? args.type
            : null;
        this.teamName = args.teamName || null;
        this.created = validators.isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
    }

    static create(args: Object = {}, id: string) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return  JSON.parse(JSON.stringify(new Message(_args)));
    }

    static messageTypes = constants.messageTypes;
}

exports.Message = Message;