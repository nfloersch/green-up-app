const shell = require("shelljs");
const jsonfile = require("jsonfile");
const file = "build.json";

const data = jsonfile.readFileSync(file);
let versions = data.jsBuildVersion.split(".");
versions[2] = (parseInt(versions[2], 10) + 1).toString();
data.jsBuildVersion = versions.join(".");
data.date = (new Date()).toString()
jsonfile.writeFileSync(file, data, { spaces: 2, EOL: "\r\n" });
shell.exec("expo publish");