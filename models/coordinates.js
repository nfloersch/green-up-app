// @flow

export default class Coordinates {
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
        if (Boolean(id)) {
            _args.id = id;
        }
        return new Coordinates(_args);
    }
}