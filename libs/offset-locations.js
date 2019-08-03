// @flow
export default function offsetLocations(staticLocations: Array<Object>, locationsToOffset: Array<Object>): Array<Object> {

    const isDupe = (staticLocs: Array<Object>, loc: Object) => staticLocs.find(
        staticLoc => {
            const staticCoordinates = staticLoc.coordinates || {};
            const locCoordinates = loc.coordinates || {};
            return (staticCoordinates).latitude && (staticCoordinates).longitude && (staticCoordinates).latitude === locCoordinates.latitude &&
                (staticCoordinates).longitude === locCoordinates.longitude;
        }
    );

    return locationsToOffset.map(loc => {
        if (isDupe(staticLocations, loc)) {
            const foo = {
                ...loc,
                coordinates: {latitude: loc.coordinates.latitude + 0.001, longitude: loc.coordinates.longitude + 0.001}
            };
            return foo;
        }

        return loc;

    });
}
