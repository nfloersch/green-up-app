// @flow

import * as turf from "@turf/helpers";
import distance from "@turf/distance";
import * as R from "ramda";

const circumferenceOfTheEarth = 24901;

export const getClosestSite = (sites: ?Array<LocationType>, userLocation: ?CoordinatesType): Object => {
    const from = turf.point([userLocation.longitude, userLocation.latitude]);

    return R.reduce(
        (closest, site) => {
            const to = turf.point([site.coordinates.longitude, site.coordinates.latitude]);
            const options = { units: "miles" };
            const siteDistance = distance(from, to, options);
            return closest.distance < siteDistance ? closest : { distance: siteDistance, site };
        },
        { distance: circumferenceOfTheEarth, site: {} },
        sites
    );
};

export const offsetLocations = (staticLocations: Array<LocationType>, locationsToOffset: Array<LocationType>): Array<LocationType> => {
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
};
