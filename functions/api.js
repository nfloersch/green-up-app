const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebaseHelper = require("firebase-functions-helper");
const express = require("express");
const cookieParser = require("cookie-parser")();
const cors = require("cors");
const app = express();
const R = require("ramda");
const bodyParser = require("body-parser");
const Town = require("./models/town");
const TrashCollectionSite = require("./models/trash-collection-site");
const SupplyDistributionSite = require("./models/supply-distribution-site");
const Celebration = require("./models/celebration");
const EventSettings = require("./models/event-settings");
const FAQ = require("./models/faq");
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
        // eslint-disable-next-line require-atomic-updates
        req.user = decodedIdToken; // not a possible race condition because middle-ware is forced to be synchronous?
        next();
        return void 0;
    }
    catch (error) {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized");
        return void 0;
    }
};

app.use(cors({ origin: true }));
app.use(cookieParser);
// These HTTPS endpoints can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
app.use(validateFirebaseIdToken);
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.text({ limit: "50mb" }));


/** * Hello ***/

app.get("/hello", (req, res) => {
    res.json({ greeting: `Hello ${ req.user.email }` });
});

/** Event Info **/
app.get("/event-settings", (req, res) => {
    const docRef = admin.firestore().collection("eventInfo").doc("settings");
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            }
            return res.status(404).send("Cannot get event info");

        })
        .catch(error => res.status(400).send("Cannot get event settings"));
});

app.patch("/event-settings", async (req, res) => {
    try {
        const db = admin.firestore();
        const userPermissions = await db.collection("admins").doc(req.user.uid).get();
        const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
        if (!isAllowed) {
            return res.status(401).send(`Unauthorized`);
        }
        const blackListedFields = ["updated", "created"];
        const fieldsToMerge = R.compose(
            R.fromPairs,
            R.filter(entry => !blackListedFields.includes(entry[0])),
            Object.entries)(req.body);

        const docRef = db.collection("eventInfo").doc("settings");
        const doc = await docRef.get();
        const newEventSettings = EventSettings.create(Object.assign({}, doc.data(), fieldsToMerge, { updated: Date() }));
        await docRef.set(newEventSettings);
        const response = await docRef.get();
        res.status(200).send({ "eventSettings": doc.data() });
    }
    catch (error) {
        res.status(400).send(`Cannot find eventSettings: ${ error }`);
    }
});


app.get("/faqs", async (req, res) => {
    const db = admin.firestore();
    firebaseHelper.firestore
        .backup(db, "faqs")
        .then(data => res.status(200).send({ faqs: data.faqs }))
        .catch(error => res.status(400).send(`Cannot get faqs: ${ error }`));
});

app.get("/faqs/:id", (req, res) => {
    const docRef = admin.firestore().collection("faqs").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            }
            return res.status(400).send(`Cannot get faq: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot get faq: ${ error }`));
});

app.post("/faq", async (req, res) => {
    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }
    const newFAQ = FAQ.create(Object.assign({}, req.body, { updated: Date(), created: Date() }));
    db.collection("faq")
        .add(newFAQ)
        .then((docRef) => docRef.get()
            .then(doc => res.status(200).send({ [docRef.id]: doc.data() })))
        .catch(error => res.status(400).send(`Cannot create faq: ${ error }`));
});

app.patch("/faqs/:id", async (req, res) => {
    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }
    const blackListedFields = ["id", "updated", "created"];
    const fieldsToMerge = R.compose(
        R.fromPairs,
        R.filter(entry => !blackListedFields.includes(entry[0])),
        Object.entries)(req.body);
    const docRef = db.collection("faqs").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                const newFaq = Faq.create(Object.assign({}, doc.data(), fieldsToMerge, { updated: Date() }));
                return docRef.set(newFaq).then(() => docRef.get()
                    .then(_doc => res.status(200).send(_doc.data())));
            }
            return res.status(404).send(`Cannot find faq: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot update faq: ${ error }`));
});

app.delete("/faq/:id", async (req, res) => {
    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }
    const docRef = db.collection("faq").doc(req.params.id);
    docRef.delete()
        .then(() => {
            const result = { id: req.params.id };
            return res.status(200).send(result);
        })
        .catch(error => res.status(400).send(error));
});

// Bulk upload of faq data
app.put("/faqs", async (req, res) => {
    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }
    const collection = db.collection("faqs");
    let data = {};
    try {
        data = Object
            .entries(req.body.faqs)
            .map(entry => Faq.create(entry[1], entry[0]));

        const records = data.map(faq => collection.doc(faq.id).set(faq).then(() => faq));
        Promise.all(records)
            .then(results => {
                const faqs = results.reduce((obj, faq) => ({ ...obj, [faq.id]: faq }), {});
                return res.status(200).send({ faqs });
            })
            .catch(error => res.status(400).send(`An error occurred: ${ JSON.stringify(error) }`));
    }
    catch (error) {
        return res.status(400).send(`An error occurred: ${ error }`);
    }

});


/** * Towns ***/

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
            }
            return res.status(400).send(`Cannot get town: ${ req.params.id }`);

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
                return docRef.set(newTown).then(() => docRef.get()
                    .then(_doc => res.status(200).send(_doc.data())));
            }
            return res.status(404).send(`Cannot find town: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot update town: ${ error }`));
});

// Bulk upload of town data
app.put("/towns", (req, res) => {

    // const blackListedFields = ["updated"];
    const collection = admin.firestore().collection("towns");
    let data = {};
    try {
        data = Object
            .entries(req.body.towns)
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

/** * Trash Collection Sites ***/

app.get("/faq", async (req, res) => {
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
            }
            return res.status(400).send(`Cannot get trashCollectionSite: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot get trashCollectionSite: ${ error }`));
});

app.post("/trash_collection_sites", (req, res) => {
    const db = admin.firestore();
    const newSite = TrashCollectionSite.create(Object.assign({}, req.body, { updated: Date(), created: Date() }));
    db.collection("trashCollectionSites")
        .add(newSite)
        .then((docRef) => docRef.get()
            .then(doc => res.status(200).send({ [docRef.id]: doc.data() })))
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
                return docRef.set(newSite).then(() => docRef.get()
                    .then(_doc => res.status(200).send({ [_doc.id]: _doc.data() })));
            }
            return res.status(404).send(`Cannot find trashCollectionSite: ${ req.params.id }`);

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
        .catch(error => res.status(400).send(error));
});

// Bulk upload of Trash Collection Sites data
app.put("/trash_collection_sites", async (req, res) => {
    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }

    try {
        const collection = db.collection("trashCollectionSites");
        const trashCollectionSites = R.map(datum => Celebration.create(datum))(req.body.trashCollectionSites);
        const newIds = Object.keys(trashCollectionSites);
        const setNewDocs = newIds.map(key => collection.doc(key).set(trashCollectionSites[key]));
        await Promise.all(setNewDocs);
        const oldAndNew = await firebaseHelper.firestore.backup(db, "trashCollectionSites");
        const oldIds = Object.keys(oldAndNew.trashCollectionSites).filter(id => (newIds.indexOf(id) < 0));
        const deletions = oldIds.map(id => db.collection("trashCollectionSites").doc(id).delete());
        await Promise.all(deletions);
        return res.status(200).send({ trashCollectionSites });
    }
    catch (error) {
        return res.status(400).send(`An error occurred: ${ error }`);
    }
});

/** * Supply Distribution Sites ***/

app.get("/supply_distribution_sites", async (req, res) => {
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
        .backup(db, "supplyDistributionSites")
        .then(data => res.status(200).send({ supplyDistributionSites: filterAll(data.supplyDistributionSites) }))
        .catch(error => res.status(400).send(`Cannot get Trash Collection Sites: ${ error }`));
});

app.get("/supply_distribution_sites/:id", (req, res) => {
    const docRef = admin.firestore().collection("supplyDistributionSites").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            }
            return res.status(400).send(`Cannot get Supply Distribution Site: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot get Supply Distribution Site: ${ error }`));
});

app.post("/supply_distribution_sites", (req, res) => {
    const db = admin.firestore();
    const newSite = SupplyDistributionSite.create(Object.assign({}, req.body, { updated: Date(), created: Date() }));

    db.collection("supplyDistributionSites")
        .add(newSite)
        .then((docRef) => docRef.get()
            .then(doc => res.status(200).send({ [docRef.id]: doc.data() })))
        .catch(error => res.status(400).send(`Cannot create Supply Distribution Site: ${ error }`));
});

app.patch("/supply_distribution_sites/:id", (req, res) => {
    const blackListedFields = ["id", "updated", "created", "townId"];
    const fieldsToMerge = R.compose(
        R.fromPairs,
        R.filter(entry => !blackListedFields.includes(entry[0])),
        Object.entries)(req.body);
    const db = admin.firestore();
    const docRef = db.collection("supplyDistributionSites").doc(req.params.id);
    docRef.get()
        .then(doc => {
            if (doc.exists) {
                const newSite = SupplyDistributionSite.create(Object.assign({}, doc.data(), fieldsToMerge, { updated: Date() }));
                return docRef.set(newSite).then(() => docRef.get()
                    .then(_doc => res.status(200).send({ [_doc.id]: _doc.data() })));
            }
            return res.status(404).send(`Cannot find  supply distribution : ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot update  supply distribution : ${ error }`));
});

app.delete("/supply_distribution_sites/:id", (req, res) => {
    const docRef = admin.firestore().collection("supplyDistributionSites").doc(req.params.id);
    docRef.delete()
        .then(() => {
            const result = { id: req.params.id };
            return res.status(200).send(result);
        })
        .catch(error => res.status(400).send(error));
});

// Bulk upload of Supply Distribution Sites data
app.put("/supply_distribution_sites", async (req, res) => {

    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }

    try {
        const collection = db.collection("supplyDistributionSites");
        const supplyDistributionSites = R.map(datum => SupplyDistributionSite.create(datum))(req.body.supplyDistributionSites);
        const newIds = Object.keys(supplyDistributionSites);
        const setNewDocs = newIds.map(key => collection.doc(key).set(supplyDistributionSites[key]));
        await Promise.all(setNewDocs);
        const oldAndNew = await firebaseHelper.firestore.backup(db, "supplyDistributionSites");
        const oldIds = Object.keys(oldAndNew.supplyDistributionSites).filter(id => (newIds.indexOf(id) < 0));
        const deletions = oldIds.map(id => db.collection("supplyDistributionSites").doc(id).delete());
        await Promise.all(deletions);
        return res.status(200).send({ supplyDistributionSites });
    }
    catch (error) {
        return res.status(400).send(`An error occurred: ${ error }`);
    }
});

/** * Celebrations ***/

app.get("/celebrations", async (req, res) => {
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
        .backup(db, "celebrations")
        .then(data => res.status(200).send({ celebrations: filterAll(data.celebrations) }))
        .catch(error => res.status(400).send(`Cannot get trash collection sites: ${ error }`));
});

app.get("/celebrations/:id", (req, res) => {
    const docRef = admin.firestore().collection("celebrations").doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            }
            return res.status(400).send(`Cannot get supply distribution site: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot get  supply distribution site: ${ error }`));
});

app.post("/celebrations", (req, res) => {
    const db = admin.firestore();
    const celebration = Celebration.create(Object.assign({}, req.body, { updated: Date(), created: Date() }));
    db.collection("celebrations")
        .add(celebration)
        .then((docRef) => docRef.get()
            .then(doc => res.status(200).send({ [docRef.id]: doc.data() })))
        .catch(error => res.status(400).send(`Cannot create Celebration: ${ error }`));
});

app.patch("/celebrations/:id", (req, res) => {
    const blackListedFields = ["id", "updated", "created", "townId"];
    const fieldsToMerge = R.compose(
        R.fromPairs,
        R.filter(entry => !blackListedFields.includes(entry[0])),
        Object.entries)(req.body);
    const db = admin.firestore();
    const docRef = db.collection("celebrations").doc(req.params.id);
    docRef.get()
        .then(doc => {
            if (doc.exists) {
                const newSite = Celebration.create(Object.assign({}, doc.data(), fieldsToMerge, { updated: Date() }));
                return docRef.set(newSite).then(() => docRef.get()
                    .then(_doc => res.status(200).send({ [_doc.id]: _doc.data() })));
            }
            return res.status(404).send(`Cannot find celebration: ${ req.params.id }`);

        })
        .catch(error => res.status(400).send(`Cannot update celebration: ${ error }`));
});

app.delete("/celebrations/:id", (req, res) => {
    const docRef = admin.firestore().collection("celebrations").doc(req.params.id);
    docRef.delete()
        .then(() => {
            const result = { id: req.params.id };
            return res.status(200).send(result);
        })
        .catch(error => res.status(400).send(error));
});

// Bulk upload of Celebrations data
app.put("/celebrations", async (req, res) => {

    const db = admin.firestore();
    const userPermissions = await db.collection("admins").doc(req.user.uid).get();
    const isAllowed = userPermissions.exists && userPermissions.data().isAdmin;
    if (!isAllowed) {
        return res.status(401).send(`Unauthorized`);
    }

    try {
        const collection = db.collection("celebrations");

        const celebrations = R.map(datum => Celebration.create(datum))(req.body.celebrations);
        const newIds = Object.keys(celebrations);

        const setNewDocs = newIds.map(key => collection.doc(key).set(celebrations[key]));
        await Promise.all(setNewDocs);
        const oldAndNew = await firebaseHelper.firestore.backup(db, "celebrations");
        const oldIds = Object.keys(oldAndNew.celebrations).filter(id => (newIds.indexOf(id) < 0));
        const deletions = oldIds.map(id => db.collection("celebrations").doc(id).delete());
        await Promise.all(deletions);
        return res.status(200).send({ celebrations });
    }
    catch (error) {
        return res.status(400).send(`An error occurred: ${ error }`);
    }
});

module.exports.app = functions.https.onRequest(app);