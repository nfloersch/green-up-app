// @flow
export default function offsetLocations(staticLocations: Array<LocationType>, locationsToOffset: Array<LocationType>): Array<LocationType> {

    const isDupe = (staticLocs: Array<LocationType>, loc: Object): boolean => Boolean(staticLocs.find(
        (staticLoc: LocationType): boolean => {
            const staticCoordinates = staticLoc.coordinates || {};
            const locCoordinates = loc.coordinates || {};
            return Boolean(
                staticCoordinates.latitude &&
                staticCoordinates.longitude &&
                staticCoordinates.latitude === locCoordinates.latitude &&
                staticCoordinates.longitude === locCoordinates.longitude
            );
        }
    ));

    return locationsToOffset.map((loc: LocationType): Object => {
        if (isDupe(staticLocations, loc)) {
            return {
                ...loc,
                coordinates: {
                    latitude: (loc.coordinates || {}).latitude + 0.001,
                    longitude: (loc.coordinates || {}).longitude + 0.001
                }
            };
        }
        return loc;
    });
}
