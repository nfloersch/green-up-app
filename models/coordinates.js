// @flow

export default class Coordinates {
    latitude: ?number;
    longitude: ?number;
    id: ?string;

    constructor(args: ?Object) {
        this.latitude = typeof (args || {}).latitude === "number" ? (args || {}).latitude : null;
        this.longitude = typeof (args || {}).longitude === "number" ? (args || {}).longitude : null;
    }

    static create(args: ?Object = {}): Coordinates {
        return new Coordinates(args);
    }
}