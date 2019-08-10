'use strict';

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const firebaseHelper = require('firebase-functions-helper');
const express = require('express');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();
const R = require('ramda');
const bodyParser = require('body-parser');


// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const validateFirebaseIdToken = async (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');

    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
        console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
            'Make sure you authorize your request by providing the following HTTP header:',
            'Authorization: Bearer <Firebase ID Token>',
            'or by passing a "__session" cookie.');
        res.status(403).send('Unauthorized');
        return void 0;
    }

    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        console.log('Found "Authorization" header');
        // Read the ID Token from the Authorization header.
        idToken = req.headers.authorization.split('Bearer ')[1];
    } else if (req.cookies) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        idToken = req.cookies.__session;
    } else {
        // No cookie
        res.status(403).send('Unauthorized');
        return void 0;
    }

    try {
        const decodedIdToken = await admin.auth().verifyIdToken(idToken);
        console.log('ID Token correctly decoded', decodedIdToken);
        req.user = decodedIdToken;
        next();
        return void 0;
    } catch (error) {
        console.error('Error while verifying Firebase ID token:', error);
        res.status(403).send('Unauthorized');
        return void 0;
    }
};

app.use(cors);
app.use(cookieParser);
// These HTTPS endpoints can only be accessed by your Firebase Users.
// Requests need to be authorized by providing an `Authorization` HTTP header
// with value `Bearer <Firebase ID Token>`.
app.use(validateFirebaseIdToken);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.get('/hello', (req, res) => {
    res.json({'greeting': `Hello ${req.user.email}`});
});

app.get('/towns', (req, res) => {
    const db = admin.firestore();
    const filterMe = data => R.filter(datum => (datum.name || '').toLowerCase().includes((req.query.name || '').toLowerCase()), data);
    firebaseHelper.firestore
        .backup(db, 'towns')
        .then(data => res.status(200).send({towns: filterMe(data.towns)}))
        .catch(error => res.status(400).send(`Cannot get towns: ${error}`));
});

app.get('/towns/:id', (req, res) => {
    const docRef = admin.firestore().collection('towns').doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return res.status(200).send(doc.data());
            } else {
                return res.status(400).send(`Cannot get town: ${req.params.id}`);
            }
        })
        .catch(error => res.status(400).send(`Cannot get town: ${error}`));

});

app.patch('/towns/:id', (req, res) => {
    const blackListedFields = ['id', 'updated', 'created'];
    const fieldsToMerge = R.compose(
        R.fromPairs,
        R.filter(entry => !blackListedFields.includes(entry[0])),
        Object.entries)(req.body);
    const docRef = admin.firestore().collection('towns').doc(req.params.id);
    docRef
        .get()
        .then(doc => {
            if (doc.exists) {
                return docRef.set({...fieldsToMerge, updated: Date()}, {merge: true}).then(() => {
                    return docRef.get()
                        .then(doc => {
                            return res.status(200).send(doc.data());
                        });
                });
            } else {
                return res.status(404).send(`Cannot find town: ${req.params.id}`);
            }
        })
        .catch(error => res.status(400).send(`Cannot update town: ${error}`));
});

exports.app = functions.https.onRequest(app);