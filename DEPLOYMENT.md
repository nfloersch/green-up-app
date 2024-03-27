# Deploying changes
There are 3 concepts to be aware of with mobile apps deployed via Expo: `Builds`, `Updates`, and `Submissions`.

`Builds` are the way our app gets packaged with native libraries necessary to run the app.
`Submissions` are how `Builds` make their way into the respective stores (Google Play, Apple App Store).
`Updates` (also known as Over the Air updates) are ways we can deploy smaller changes directly to users without going through the `Build` -> `Submission` process.
> Updates can only be pushed to compatible Build

[Expo's Application Services](https://docs.expo.dev/eas/) (EAS) are used to perform each of these steps.

# Deployment pre-requisites
1. Tools & Login
2. Configuration
3. Environment

1. Tools & Login
`npm install -g eas-cli`

Then, you will need to login:
`eas login`

2. Configuration
Make sure you have the configuration files necessary to deploy the app.
- `firebase-config.dev.js`
- `firebase-config.qa.js`
- `firebase-config.prod.js`

3. Environment
You will also need the appropriate environment variables and credentials set in order to interact with any of the tooling.
Make sure you have an `.env` file in place with two values:
EAS_PROJECT_ID="<replace me>"
EXPO_UPDATE_URL="<replace me>"

# Validating Configuration
Before submitting builds to EAS it can be useful to see what the app configuration might look like.

`eas config` Shows the configuration for the app based on the profile you select.

`eas config --platform android --profile production`

It is worth mentioning that any secrets defined in the Expo account will override environment variables used during the build process.

# Builds
EAS `build` command is used to kick off builds.

Typical options:
--platform android|ios (target a particular platform, leaving this out triggers both)
--profile dev|qa|production (corresponds to the profile set in `eas.json`)

`eas build --profile dev` - Generate a dev build

This command will upload your entire project to EAS build servers to be built remotely.
The files that will be uploaded will follow the patterns defined in `.easignore`.

To inspect the package that will be uploaded, you can use the following command:
`eas build:inspect --stage archive --output ~/greenup-output --platform android`

See the following for more details on this: https://github.com/expo/fyi/blob/main/eas-build-archive.md

# Submissions
EAS Submit is used to deploy a specific build to the stores.

To submit a build, use `eas submit`.

To submit a build to the Play Store for production, use `eas submit --platform android --profile production` 

https://docs.expo.dev/submit/introduction

# Updates
EAS Update is used to push updates out to users who have the app already installed.

To submit an update, use `eas update`.

To push an update to a `qa` branch use:
`eas update --branch qa --message "We did an update"`
 
https://docs.expo.dev/eas-update/introduction/