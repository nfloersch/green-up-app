// @flow
/* global require, exports */

class Coordinates {
    latitude: ?number;
    longitude: ?number;
    id: ?string;

    constructor(args: ?Object) {
        this.id = (args || {}).id || null;
        this.latitude = typeof (args || {}).latitude === 'number' ? (args || {}).latitude : null;
        this.longitude = typeof (args || {}).longitude === 'number' ? (args || {}).longitude : null;
    }

    static create(args: ?Object = {}, id?: string) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return  JSON.parse(JSON.stringify(new Coordinates(_args)));
    }
}

exports.Coordinates = Coordinates;