// @flow

export class Coordinates {
    latitude: number;
    longitude: number;

    constructor(args: Object) {
        this.latitude = typeof args.latitude === 'number' ? args.latitude : null;
        this.longitude = typeof args.longitude === 'number' ? args.longitude : null;
    }

    static create(args) {
        return new Coordinates(args || {});
    }
}