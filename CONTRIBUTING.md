# Contributing Code


## First Steps

1) **Phone a friend**: The first step is always to chat up folks on [#green-up][3] on Slack. Visit our channel [here][4] or if it's your first time, get an invitation [here][5].

2) **Get a Dev Environment Running**: Our "Full Local Environment" setup is up to date as of 03 April 2022.

3) **Check the Project Board**: We have our open software tickets organized under [projects](https://github.com/codeforbtv/green-up-app/projects). If you're new to the project, look for those labeled as ['good first issue'](https://github.com/codeforbtv/green-up-app/labels/good%20first%20issue).

4) **Dial Tech Support**: If you have trouble at any point we have a dedicated slack channel for that.  Join the [#tech-support](https://codeforbtv.slack.com/messages/tech-support/) channel and someone will help you out asap.

5) **Get to work!** See [How to Contribute Your Work](#How-to-Contribute-Your-Work) below.

## Environment Setup

### A Full Local Environment

1) **Get a Config File**: You won't be able to run the code without a firebase-config.json file. The fastest approach is to use our shared dev environment (..which we share, so please treat it kindly). There is one pinned to the [#green-up Slack channel][3] for our dev environment. If you have trouble finding it, just ask anyone in the channel. Save your firebase-config.json in the root of the project.

1) **(Optional) Use Your Own Firebase Account**: Setup a Firebase app and use those app settings to configure firebase-config.json,
   Get your own Firebase database here (https://firebase.google.com/) or, if you want to contribute to this project, find us on [Slack][4] and we'll gladly share ours. Not on our Slack board?  [Get an invitation.][5]

2) **Ensure you have `nvm` installed**: Do this by running `nvm ls`. If you see a list of `node` versions printed to your console, then you're all set. Otherwise, follow the [setup instructions](https://github.com/nvm-sh/nvm#installing-and-updating).

3) **Install Project Dependencies**:
   `.nvmrc` file should drive the correct node version to use without specifying it explicitly.

```bash
nvm install
nvm use
# optional nvm alias green-up v18.19.1
yarn install
# flow
npm install -g flow
# or
yarn global add flow
```

4) **Download the Expo App**: The Green Up app is configured to be run on your physical phone inside the Expo mobile app (aka the "Expo Client"). Expo is a shell that runs the unpublished mobile app.
    * [Download for iPhones][1]
    * [Download for Android][2]

5) **Start the Application**: Run the project in the root folder.

```bash
npx expo start
# or
yarn start
# or
npm start
```

6) **Profit!** When the giant QR code appears in the editor...
    * **iPhones**: point your camera at the QR code and the app will launch in expo
    * **Android**: open the Expo mobile app and click "Scan QR Code"

   This will open the app on your phone. Now create an account and begin exploring!

## How to Contribute Your Work

To contribute, send us a pull request. Our team will do our best to review it on time and merge it to master.

1. If you're working on an existing issue, assign it to yourself and drag it to the 'In Progress' column in the project it's assigned to.
1. [Create a branch](https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/) from master. If you don't have permissions to create a branch, [fork the repository](https://help.github.com/articles/fork-a-repo/). If the change you're making belongs to an issue, use the issue number as the branch name e.g issue-22
1. Make the changes in your branch.
1. Commit the changes to your branch using a clear and descriptive commit message.
1. Push the changes to your branch.
1. Make sure that your branch has the latest source from the master branch.
1. Create a pull request either [from your fork](https://help.github.com/articles/creating-a-pull-request-from-a-fork/) or [your branch](https://help.github.com/articles/creating-a-pull-request/). Include any relevant information about your changes in the pull request description
1. Address any questions from the pull request
1. Once the pull request has been accepted and merged to master be sure to delete your branch and drag the corresponding issue (if any) to the 'Done' column.

## Code of Conduct

This project has adopted the [Code for BTV Code of Conduct](http://codeforbtv.org/code-conduct).

## Licensing

See the [LICENSE](./LICENSE.md) for information on this project's license.

[1]: https://apps.apple.com/us/app/expo-client/id982107779
[2]: https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www
[3]: https://codeforbtv.slack.com/messages/green-up/
[4]: https://codeforbtv.slack.com/
[5]: https://cfbtv-slackin.herokuapp.com/