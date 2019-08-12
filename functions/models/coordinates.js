/* global require */

class Coordinates {

    constructor(args) {
        this.id = (args || {}).id || null;
        this.latitude = typeof (args || {}).latitude === 'number' ? (args || {}).latitude : null;
        this.longitude = typeof (args || {}).longitude === 'number' ? (args || {}).longitude : null;
    }

    static create(args = {}, id) {
        const _args = {...args};
        if (id) {
            _args.id = id;
        }
        return JSON.parse(JSON.stringify(new Coordinates(_args)));
    }
}

module.exports = Coordinates;