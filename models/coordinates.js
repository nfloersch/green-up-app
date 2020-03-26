// @flow

export default class Coordinates {
    latitude: ?number;
    longitude: ?number;
    latitudeDelta: ?number;
    longitudeDelta: ?number;

    constructor(args: ?Object) {
        this.latitude = typeof (args || {}).latitude === "number" ? (args || {}).latitude : null;
        this.longitude = typeof (args || {}).longitude === "number" ? (args || {}).longitude : null;
        this.latitudeDelta = typeof (args || {}).latitudeDelta === "number" ? (args || {}).latitudeDelta : 0.0922;
        this.longitudeDelta = typeof (args || {}).longitudeDelta === "number" ? (args || {}).longitudeDelta : 0.0421;
    }

    static create(args: ?Object = {}): Coordinates {
        return JSON.parse(JSON.stringify(new Coordinates(args)));
    }
}