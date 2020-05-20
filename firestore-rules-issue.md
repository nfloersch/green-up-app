Greenup Project firestore-rules issue

The problem: 

We discovered that most of the data from the firebase api was suddenly no longer being imported into the PROD version of the GreenUp app. 

Simultaneously, no one with admin permissions was able to log in to the PROD version of the Greenup Admin tool.

Steps to solve the problem:

At first and for a long time, it was not clear whether the two issues were related, although we noted that similar permissions error logs were being generated from both the Admin tool login screen and the App api get requests.

We further noted that both the Admin tool and a new set of firestore-rules had been deployed on the same day a few days previously.
Our hypotheses centered on config/ api key issues, admin / authorization issues related to the service accounts and the Firebase Admin SDK, and firestore-rules.

We quickly dropped the api keys from consideration due largely to the fact that incorrect config files would prevent any data at all from being visible.

We created a new Admin SDK; using it however did not affect any behaviors.

We then compared the new firestore-rules with the older ones, and then the older PROD rules with the most current QA firestore-rules (which were deployed the same day as the older PROD rules), and discovered that the two sets of older rules were identical and significantly different from the updated PROD rules.

We decided to redeploy the older rules, which immediately solved the Admin login issues and restored data to the App.

Explanation:

When the Admin tool was deployed, it was a full deployment, which included the api functions and the firestore-rules along with simple hosting. The functions did not pass as they were inconsistent with the functions in firebase, but the rules overwrote the existing rules stored in firebase.

Since the permission rules affect both the App and the Admin tool, both apps were compromised. The correct firestore-rules are being stored in the App’s code.

We surmised that the significant differences in the rules found in the Admin code with respect to those found in the App’s code are due to them being sketched out first in the Admin and then abandoned in favor of new rules in the App. The creators of the App and Admin tools never intended the rules in the Admin code to be deployed.

Conclusion: 

Firestore-rules, api functions and hosting should always be deployed individually and one at a time. 
