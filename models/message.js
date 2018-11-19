// @flow

import * as messageTypes from '../constants/message-types';
import {isValidDate} from '../libs/validators';
import TeamMember from './team-member';

export default class Message {
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
        this.id = typeof args.id === 'string'
            ? args.id
            : null;
        this.text = typeof args.text === 'string'
            ? args.text
            : null;
        this.sender = typeof args.sender === 'object'
            ? TeamMember.create(args.sender)
            : null;
        this.teamId = typeof args.teamId === 'string'
            ? args.teamId
            : null;
        this.read = typeof args.read === 'boolean'
            ? args.read
            : false;
        this.active = typeof args.active === 'boolean'
            ? args.active
            : true;
        this.link = typeof args.link === 'string'
            ? args.link
            : null;
        this.type = typeof args.type === 'string' && args.type in messageTypes
            ? args.type
            : null;
        this.teamName = args.teamName || null;
        this.created = isValidDate(new Date(args.created))
            ? new Date(args.created)
            : new Date();
    }

    static create(args: Object = {}, id: string) {
        const _args = {...args};
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Message(_args);
    }

    static messageTypes = messageTypes;
}
