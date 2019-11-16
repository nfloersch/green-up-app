"use strict";

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseHelper = require("firebase-functions-helper");
const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors")({ origin: true });
const app = express();
const R = require("ramda");
const bodyParser = require("body-parser");
const Town = require("./models/town");
const TrashCollectionSite = require("./models/trash-collection-site");

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req, res, next) => {
    console.log("Check if request is authorized with Firebase ID token");

    if ((!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) &&
        !(req.cookies && req.cookies.__session)) {
        console.error("No Firebase ID token was passed as a Bearer token in the Authorization header.",
            "Make sure you authorize your request by providing the following HTTP header:",
            "Authorization: Bearer <Firebase ID Token>",
            "or by passing a \"__session\" cookie.");
        res.status(403).send("Unauthorized");
        return void 0;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        console.log("Found \"Authorization\" header");
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else if (req.cookies) {
        console.log("Found \"__session\" cookie");
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send("Unauthorized");
        return void 0;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log("ID Token correctly decoded", decodedIdToken);
        req.user = decodedIdToken;
        next();
        return void 0;
    }
    catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized");
        return void 0;
    }
};

app.use(cors);
app.use(cookieParser);
// These HTTPS endpoints can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
app.use(validateFirebaseIdToken);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get("/hello", (req, res) => {
    res.json({ "greeting": `Hello ${ req.user.email }` });
});

app.get("/towns", async (req, res) => {
    const db = admin.firestore();
    const filterName = data => R.filter(datum => (datum.name || "").toLowerCase().includes((req.query.name || "").toLowerCase()), data);
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isCoordinator = userPermissions.exists && (userPermissions.data().isCoordinator || userPermissions.data().isAdmin);
    const permittedTowns = isCoordinator ? userPermissions.data().towns || [] : [];

    const filterEditable = R.cond([
        [editable => typeof editable === "string" && editable.toLowerCase() === "false", () => R.filter(town => !permittedTowns.includes(town.id))],
        [editable => typeof editable === "string" && editable.toLowerCase() === "true", () => R.filter(town => permittedTowns.includes(town.id))],
        [editable => editable === false, () => R.filter(town => !permittedTowns.includes(town.id))],
        [editable => editable === true, () => R.filter(town => permittedTowns.includes(town.id))],
        [R.T, () => R.filter(R.T)]
    ]);
    const filterAll = R.compose(filterName, filterEditable(req.query.editable));

    firebaseHelper.firestore
        .backup(db, "towns")
        .then(data => res.status(200).send({ towns: filterAll(data.towns) }))
        .catch(error => res.status(400).send(`Cannot get towns: ${ error }`));
});

app.get("/towns/:id", (req, res) => {
    const docRef = admin.firestore().collection("towns").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            } else {
                return res.status(400).send(`Cannot get town: ${ req.params.id }`);
            }
        })
        .catch(error => res.status(400).send(`Cannot get town: ${ error }`));
});

app.patch("/towns/:id", (req, res) => {
    const blackListedFields = ["id", "updated", "created"];
    const fieldsToMerge = R.compose(
        R.fromPairs,
        R.filter(entry => !blackListedFields.includes(entry[0])),
        Object.entries)(req.body);
    const docRef = admin.firestore().collection("towns").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                const newTown = Town.create(Object.assign({}, doc.data(), fieldsToMerge, { updated: Date() }));
                return docRef.set(newTown).then(() => {
                    return docRef.get()
                        .then(doc => {
                            return res.status(200).send(doc.data());
                        });
                });
            } else {
                return res.status(404).send(`Cannot find town: ${ req.params.id }`);
            }
        })
        .catch(error => res.status(400).send(`Cannot update town: ${ error }`));
});

// Bulk upload of town data
app.put("/towns", (req, res) => {

    //const blackListedFields = ["updated"];
    const collection = admin.firestore().collection("towns");
    let data = {};
    try {
        data = Object
            .entries(JSON.parse(req.body.towns))
            .map(entry => Town.create(entry[1], entry[0]));

        const records = data.map(town => collection.doc(town.id).set(town).then(() => town));
        Promise.all(records)
            .then(results => {
                const towns = results.reduce((obj, town) => ({ ...obj, [town.id]: town }), {});
                return res.status(200).send({ towns });
            })
            .catch(error => res.status(400).send(`An error occurred: ${ JSON.stringify(error) }`));
    }
    catch (error) {
        return res.status(400).send(`An error occurred: ${ error }`);
    }

});

// Trash Collection Sites
app.get("/trash_collection_sites", async (req, res) => {
    const db = admin.firestore();
    const filterByName = data => R.filter(datum => (datum.name || "").toLowerCase().includes((req.query.name || "").toLowerCase()), data);
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isCoordinator = userPermissions.exists && (userPermissions.data().isCoordinator || userPermissions.data().isAdmin);
    const permittedTowns = isCoordinator ? userPermissions.data().towns || [] : [];
    const filterEditable = R.cond([
        [editable => typeof editable === "string" && editable.toLowerCase() === "false", () => R.filter(trashCollectionSite => !permittedTowns.includes(trashCollectionSite.townId))],
        [editable => typeof editable === "string" && editable.toLowerCase() === "true", () => R.filter(trashCollectionSite => permittedTowns.includes(trashCollectionSite.townId))],
        [editable => editable === false, () => R.filter(trashCollectionSite => !permittedTowns.includes(trashCollectionSite.townId))],
        [editable => editable === true, () => R.filter(trashCollectionSite => permittedTowns.includes(trashCollectionSite.townId))],
        [R.T, () => R.filter(R.T)]
    ]);
    const filterAll = R.compose(filterByName, filterEditable(req.query.editable));

    firebaseHelper.firestore
        .backup(db, "trashCollectionSites")
        .then(data => res.status(200).send({ trashCollectionSites: filterAll(data.trashCollectionSites) }))
        .catch(error => res.status(400).send(`Cannot get trash collection sites: ${ error }`));
});

app.get("/trash_collection_sites/:id", (req, res) => {
    const docRef = admin.firestore().collection("trashCollectionSites").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            } else {
                return res.status(400).send(`Cannot get trashCollectionSite: ${ req.params.id }`);
            }
        })
        .catch(error => res.status(400).send(`Cannot get trashCollectionSite: ${ error }`));
});

app.post("/trash_collection_sites", (req, res) => {
    const db = admin.firestore();
    const newSite = TrashCollectionSite.create(Object.assign({}, req.body, { updated: Date(), created: Date() }));
    db.collection("trashCollectionSites")
        .add(newSite)
        .then((docRef) => {
            return docRef.get()
                .then(doc => {
                    return res.status(200).send({ [docRef.id]: doc.data() });
                });
        })
        .catch(error => res.status(400).send(`Cannot create trashCollectionSite: ${ error }`));
});

app.patch("/trash_collection_sites/:id", (req, res) => {
    const blackListedFields = ["id", "updated", "created", "townId"];
    const fieldsToMerge = R.compose(
        R.fromPairs,
        R.filter(entry => !blackListedFields.includes(entry[0])),
        Object.entries)(req.body);
    const db = admin.firestore();
    const docRef = db.collection("trashCollectionSites").doc(req.params.id);
    docRef.get()
        .then(doc => {
            if (doc.exists) {
                const newSite = TrashCollectionSite.create(Object.assign({}, doc.data(), fieldsToMerge, { updated: Date() }));
                return docRef.set(newSite).then(() => {
                    return docRef.get()
                        .then(doc => {
                            return res.status(200).send({ [doc.id]: doc.data() });
                        });
                });
            } else {
                return res.status(404).send(`Cannot find trashCollectionSite: ${ req.params.id }`);
            }
        })
        .catch(error => res.status(400).send(`Cannot update trashCollectionSite: ${ error }`));
});

app.delete("/trash_collection_sites/:id", (req, res) => {
    const docRef = admin.firestore().collection("trashCollectionSites").doc(req.params.id);
    docRef.delete()
        .then(() => {
            const result = { id: req.params.id };
            return res.status(200).send(result);
        })
        .catch(error => {
            return res.status(400).send(error);
        });
});

// Bulk upload of Trash Collection Sites data
app.put("/trash_collection_sites", (req, res) => {

    const collection = admin.firestore().collection("trashCollectionSites");
    try {
        const data = R.map(site => TrashCollectionSite.create(site), Object.values(JSON.parse(req.body.trashCollectionSites)));
        const records = data.map(site => collection.add(site));
        Promise.all(records)
            .then(results => {
                return res.status(200).send({ results });
            })
            .catch(error => res.status(400).send(`An error occurred: ${ JSON.stringify(error) }`));
    }
    catch (error) {
        return res.status(400).send(`An error occurred: ${ error }`);
    }

});


module.exports.app = functions.https.onRequest(app);