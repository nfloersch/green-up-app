const deconstruct = require("./libs/deconstruct");
const Coordinates = require("./coordinates");

const standardOffsetFactor = 0.1;

class MapPin {

    constructor(args = {}) {
        this.active = typeof args.active === "boolean" ? args.active : true;
        this.color = typeof args.color === "string" ? args.color : null;
        this.coordinates = Coordinates.create(args.coordinates);
        this.description = typeof args.description === "string" ? args.description : null;
        this.id = typeof args.id === "string" ? args.id : null;
        this.icon = typeof args.icon === "string" ? args.icon : null;
        this.title = typeof args.title === "string" ? args.title : null;
    }

    static create(args = {})  {
        return deconstruct(new MapPin(args));
    }

    static offset(pin, distance = 1, azimuth = 45) {
        const r = distance * standardOffsetFactor;
        const theta = azimuth * Math.PI / 180;
        const x = r * Math.cos(theta);
        const y = r * Math.sin(theta);
        const latitude = (pin.coordinates || {}).latitude + x;
        const longitude = (pin.coordinates || {}).longitude + y;
        return MapPin.create({ ...pin, coordinates: Coordinates.create({ ...pin.coordinates, latitude, longitude }) });
    }
}

module.exports = MapPin;