// @flow


export class Coordinate {
    uid: string;
    lat: string;
    long: string;

    constructor(args = {}) {
        this.uid = typeof args.uid === 'string' ? args.uid : null;
        this.lat = typeof args.lat === 'string' ? args.name : null;
        this.long = typeof args.long === 'string' ? args.long : null;
    }

    static create(args) {
        return new Coordinate(args);
    }
}