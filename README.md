# Green Up App

<p align="center">
  <img alt="Green Up Vermont Logo" width="300" height="300" src="./assets/images/app.png">
</p>

This repository contains the source code for the Green Up App, a mobile app for Vermont's Green Up Day. Green Up App is an official Code for America Project. More information about the motivation and context of this project is available on the [Code for BTV Website](http://codeforbtv.org/projects/greenup-app).

## How to contribute

See the [CONTRIBUTING](./CONTRIBUTING.md) page for details on how to contribute.

## Setting up your development environment

Install the [expo cli](https://expo.io/tools#cli) 

```
npm install expo-cli --global
```

Install [node.js](https://nodejs.org/en/)

Clone this repository
```
git clone https://github.com/codeforbtv/green-up-app.git
```
Run ```npm install``` in the root folder. Depending on your system, you may need to run it as sudo.

Create the firebase-config.js file and make sure you have the correct configuration in there. Ask around in the #green-up Slack channel about what these are.

```
touch data-sources/firebase-config.js
```

Install the [expo client](https://expo.io/tools#client) on your phone

For running in an emulator, install [Genymotion](https://www.genymotion.com/).

Run the project in the root folder.

```
expo start
```

## Licensing

See the [LICENSE](./LICENSE.md) page for details on the license.

## Download the app from your favorite App Store
[![Google Play](https://marketing-image-production.s3.amazonaws.com/uploads/f6b617affe48b29f9e8e0cd4a2f00f8a689d4af60644ecb4815df27a6dfeded92347f4846b4f51c48ba3e1db61bb074baa745bb002c4a0bda12ec99213fc7f93.png "Download in Google Play")](https://play.google.com/store/apps/details?id=org.greenupvermont.app)

[![Apple Store](https://marketing-image-production.s3.amazonaws.com/uploads/b4e302ed648152b727e7dc9bd648e5ab962c68e414be6220b31e8013080f9fbd86cb9f9358cf8a3bcd3a00af309034c6ec68cb7ce1dfa7317e9b97d07cd4bbc6.png "Download in Apple Store")](https://itunes.apple.com/us/app/green-up-vermont/id1364770239?mt=8)
