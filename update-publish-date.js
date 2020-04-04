const jsonfile = require("jsonfile");
const file = "package.json";
const data = jsonfile.readFileSync(file);
const date = new Date();
const publishDate = `${date.getYear() + 1900}-${date.getMonth() + 1}-${date.getDate()}`;
data.publishDate = publishDate;
console.log(`New publish date: ${ publishDate}`);
jsonfile.writeFileSync(file, data, { spaces: 2, EOL: "\r\n" });
