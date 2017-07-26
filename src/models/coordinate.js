// @flow


export class Coordinate {
    _id: string;
    lat: string;
    long: string;

    constructor(args = {}) {
        this._id = typeof args._id === 'string' ? args._id : null;
        this.lat = typeof args.lat === 'string' ? args.name : null;
        this.long = typeof args.long === 'string' ? args.long : null;
    }

    static create(args) {
        return new Coordinate(args);
    }
}