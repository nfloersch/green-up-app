// Read Synchrously
const fs = require("fs");
const R = require("ramda");
console.log("\n *START* \n");
const content = fs.readFileSync("./data-sources/montpelier.json");
console.log(`Output Content : \n${content}`);
const geojson = JSON.parse(content);
const morphCoords = coords => {
    const splits = R.compose(R.partition(x => x < 0), R.flatten)(coords);
    return R.compose(R.map(coords => ({ latitude: coords[1], longitude: coords[0] })), R.zip)(splits[0], splits[1]);
};
const polys = R.map(feature => {
    // eslint-disable-next-line no-unused-vars
    const { geometry, ISVISIBLE_, properties } = feature;
    return ({ ...properties, coordinates: morphCoords(geometry.coordinates) });
})(geojson.features);


fs.writeFile("./data-sources/road-polys.json", JSON.stringify(polys, 0, 4), (err) => {

});