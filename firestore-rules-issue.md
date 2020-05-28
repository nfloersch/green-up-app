# Greenup Project firestore-rules issue

# The problem: 

On Sunday 5/18/2020 we discovered two issues: 

1. most of the data from the firebase api was suddenly no longer being imported into the PROD version of the GreenUp app. 

2. simultaneously, no one with admin permissions was able to log in to the PROD version of the Greenup Admin tool.

# The cause:

Ultimately we determined that the root cause was that a deployment intended to deploy the admin tool also accidentally deployed breaking changes to the firestore rules. 

The broken firestore rules prevented teams from being created or retrieved in the app, and prevented users from logging into the admin tool.

# Troubleshooting the issue:

At first and for a long time, it was not clear whether the two issues were related, although we noted that similar permissions error logs were being generated from both the Admin tool login screen and the App api get requests.

We further noted that both the Admin tool and a new set of firestore-rules had been deployed on the same day a few days previously.
Our hypotheses centered on config/ api key issues, admin / authorization issues related to the service accounts and the Firebase Admin SDK, and firestore-rules.

We quickly dropped the api keys from consideration due largely to the fact that incorrect config files would prevent **_any data_** at all from being visible.

We created a new Firebase Admin SDK service account. The theory behind this was based on comparing the QA and Production environments. The Admin SDK service account in the QA environment was the newer type of service account while PROD had the older, legacy type account (which uses keys for authentication). Using it however did not affect any behaviors
Note: Since the new account did not appear to change anything, we left it as the active account in PROD and disable the legacy account.

We then compared the new firestore-rules with the older ones, and then the older PROD rules with the most current QA firestore-rules (which were deployed the same day as the older PROD rules), and discovered that the two sets of older rules were identical and significantly different from the updated PROD rules.

We decided to redeploy the older rules, which immediately solved the Admin login issues and restored data to the App.

# Explanation:

When the Admin tool was deployed, it was a full deployment, which included the api functions and the firestore-rules along with simple hosting. The functions did not pass as they were inconsistent with the functions in firebase, but the rules overwrote the existing rules stored in firebase.

Since the permission rules affect both the App and the Admin tool, both apps were compromised. The correct firestore-rules are being stored in the App’s code.

We surmised that the significant differences in the rules found in the Admin code with respect to those found in the App’s code are due to them being sketched out first in the Admin and then abandoned in favor of new rules in the App. The creators of the App and Admin tools never intended the rules in the Admin code to be deployed.

# Conclusion: 

- Firestore-rules, api functions and hosting should always be deployed individually and one at a time. It is too easy to unintentionally deploy multiple components.
- From the perspective of the admin tool, it is confusing that the firestore permission rules are depoyed from the mobile app. 

# Recommendations

- Codify deployment commands as package.json scripts
- Consider separating the api functions and firebase permission rules into a different repo
- Document the interplay of the different systems (admin tool, sdk, api, mobile app) and how each affects the other so new administrators can more easily understand which systems can affect each other.

# Hot Tips
- The [Firestore Rules history, diffing tool, and playground](https://console.firebase.google.com/u/1/project/greenupvermont-qa/database/firestore/rules) were very helpful in identifying differences in rules before & after the issue surfaced 
