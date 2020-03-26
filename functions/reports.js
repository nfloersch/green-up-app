const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { Parser } = require("json2csv");

/**
 * This is fine to leave commented out until we decide to integrate this into
 * the admin dashboard, or some other way for non-coders to retrieve this csv.
 * Until then, you can run this report by uncommenting this function, making sure
 * you're using the production firebase database, and then running the emulator.
 *
 * Note: don't forget to set maxResults = 1000 after testing.
 *
 *   $ firebase use prod
 *   Now using alias prod (greenupvermont-de02b)
 *
 *   $ firebase emulators:start --only functions
 *   i  Starting emulators: ["functions"]
 *   ✔  functions: Emulator started at http://localhost:5001
 *   ✔  functions[reports-reports]: http function initialized (http://localhost:5001/greenupvermont-de02b/us-central1/reports-reports).
 */
const userReport = (request, response) => {
    const auth = admin.auth();
    const maxResults = 5; // optional arg.

    // loop over app users
    return auth.listUsers(maxResults)
        .then((userRecords) => {
            // collect user data
            const userData = (userRecords.users || []).map(user => ({
                email: user.email,
                isVerified: user.emailVerified,
                provider: (user.providerData || []).map(p => p.providerId).join(","),
                created: user.metadata.creationTime,
                lastLogin: user.metadata.lastSignInTime
            }));

            // configure csv parser
            const csvFields = ["email", "isVerified", "provider", "created", "lastLogin"];
            const opts = { fields: csvFields };
            const parser = new Parser(opts);
            const csv = parser.parse(userData);

            // download csv file
            const now = new Date();
            const timestamp = `${ now.getDate() }-${ now.getMonth() }-${ now.getFullYear() }_${ now.getHours() }:${ now.getMinutes() }`;
            response.setHeader("Content-disposition", `attachment; filename=green-up-app-users_${ timestamp }.csv`);
            response.set("Content-Type", "text/csv");
            response.status(200).send(csv);
            return this;
        })
        .catch(error => {
            console.log(error);
        });
};

module.exports = { reports: functions.https.onRequest(userReport) };