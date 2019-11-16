const fs = require('fs');
fs.readFile('./towns.json', 'utf8', (err, data) => {
    var foo = JSON.parse(data);
    console.log(Object.keys(foo));
    var a = Object
        .values(foo.towns)
        .forEach(town => {
            town.dropOffLocations.map(loc => ({
                townId: town.id,
                ...loc,
            }));
        });
    var b = Object.entries(data.towns).map((id, town) => town.dropOffLocations);
    var c = b.reduce((a, b) => [...a, ...b]);
    fs.writeFile('sites2.json', JSON.stringify(c), err => {})
});
