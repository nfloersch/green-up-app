# Green Up Vermont
Summer of Civic Hacking
A mobile app for Vermont's Green Up Day.

## Table of Contents
- [Running This App] (#running-this-app)

- [Setting Up Your Development Environment on Windows](#setting-up-your-development-environment-on-windows)
  - [Install Python 2](#install-python-2)
  - [Install Node](#install-node)
  - [Install and Configure Atom](#install-and-configure-atom)
  - [Install Meld](#install-meld)
  - [Install and Configure Git](#install-and-configure-git)
  - [Install Java 8 JDK](#install-java-8-jdk)
  - [Install React Native](#install-react-native)
  - [Install and Configure Android Studio](#install-and-configure-android-studio)
  - [Set the ANDROID_HOME Environment Variable](#set-the-android_home-environment-variable)
  - [Create a New Android Virtual Device](#create-a-new-android-virtual-device)
  - [Clone the Green Up Vermont repository](#clone-the-green-up-vermont-repository)
  - [Run the Project](#run-the-project)

- [Setting Up Your Development Environment on Mac](#setting-up-your-development-environment-on-mac)
  - [Install Python 2 on Mac](#install-python-2-on-mac)
  - [Install Node on Mac](#install-node-on-mac)
  - [Install and Configure Atom on Mac](#install-and-configure-atom-on-mac)
  - [Install Meld on Mac](#install-meld-on-mac)
  - [Install and Configure Git on Mac](#install-and-configure-git-on-mac)
  - [Install Java 8 JDK on Mac](#install-java-8-jdk-on-mac)
  - [Install React Native on Mac](#install-react-native-on-mac)
  - [Install XCode on Mac](#install-xcode-on-mac)
  - [Install and Configure Android Studio on Mac](#install-and-configure-android-studio-on-mac)
  - [Set the ANDROID_HOME Environment Variable on Mac](#set-the-android_home-environment-variable-on-mac)
  - [Create a New Android Virtual Device on Mac](#create-a-new-android-virtual-device-on-mac)
  - [Clone the Green Up Vermont repository on Mac](#clone-the-green-up-vermont-repository-on-mac)
  - [Run the Project on Mac](#run-the-project-on-mac)


## Running This App


A simple usage example. If you're using redux, take a look at [example-redux](../example-redux).


* In the `GreenUpVermont/` folder, run `npm install`
* In the `GreenUpVermont/` folder, run `react-native start`
* To run in iOS (Mac only), open a new terminal windows and in the `GreenUpVermont/` run `react-native run-ios`
* To run in Android, start an emulator from Android Studio, then open a new terminal windows and in the `GreenUpVermont/` run `react-native run-android`


  
  
## Setting Up Your Development Environment on Mac
### Install Python 2 on Mac

1. Download the Python2 installer here : https://www.python.org/ftp/python/2.7.13/python-2.7.13-macosx10.6.pkg

2. Launch Installer and click through standard installation.

![Alt](/docs/assets/Python1.png "Python Installer 1")

3. Install Python

![Alt](/docs/assets/Python2.png "Python Installer 2")

4. Check version of python with `python --version` in terminal. It should be version 2.7.13.

![Alt](/docs/assets/Python3.png "Python Installer 3")

### Install Node on Mac

1. Download the Node installer here : https://nodejs.org/dist/v7.10.0/node-v7.10.0.pkg

2. Launch the installer.

![Alt](/docs/assets/Node1.png "Node Installer 1")

3. Click through the installer accepting all the default settings.

4. Verify that Node is installed by opening a terminal and typing node --version you should see "v7.10.0"

![Alt](/docs/assets/Node2.png "Node 2")

### Install and Configure Atom on Mac

1. Download the Atom installer here : https://atom.io/download/mac

2. Launch the installer and click through with normal installation.

3. In atom go to Atom -> Preferences -> Packages and then search for nuclide and install the first result by facebook.

![Alt](/docs/assets/Atom1.png "Atom 1")

4. When atom opens it should look like this you can pin this to your taskbar if you like.

![Alt](/docs/assets/Atom2.png "Atom 2")

### Install Meld on Mac

Meld is not directly supported for Mac so you will need to use a Mac build for meld.

1. Download the dmg for meld here: https://github.com/yousseb/meld/releases/download/osx-9/meldmerge.dmg

2. Launch the installer.

3. Click through the installer accepting all the default settings.

4. If you want, pin Meld to your taskbar like you did Atom.

### Install and Configure Git on Mac

1. Download the Git installer here : https://sourceforge.net/projects/git-osx-installer/files/git-2.13.1-intel-universal-mavericks.dmg/download?use_mirror=autoselect

2. Launch the installer. You will get a warning that the software is from an unidentified developer. To download anyways, go into preferencers -> Security -> At the bottom click the "Open Anyway" Button

![Alt](/docs/assets/Git1.png "Git 2")

3. Click throught the installation

4. Install

![Alt](/docs/assets/Git2.png "Git 2")

5. Check the version of Git with `git --verion`, it should be 2.13.1.

![Alt](/docs/assets/Git3.png "Git 3")

6. Set your name and email in Git using the following commands in the terminal: 
`git config --global user.name "YOUR NAME"`
`git config --global user.email your.email@somecompany.com`

![Alt](/docs/assets/Git4.png "Git 4")

### Install Java 8 JDK on Mac

1. Go to the Download page for the Java 8 JDK here : http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

2. Accept the licensing agreement and click the download link for Mac OS X.

![Alt](/docs/assets/Java1.png "Java1")

3. Launch installer and click through the installer accepting all the default settings.

4. Verify that Java is installed by launching a terminal window and typing java -version. You should should see 'java version "1.8.0_131"'


### Install React Native on Mac

1. Open a terminal window and install React Native Command Line Interface using the Node Package Manager by typing `npm install -g react-native-cli`

2. Verify that React Native is installed by typing `react-native -version` You should see "react-native-cli: 2.0.1"
### Clone the Green Up Vermont repository on Mac

(These were instructions for windows but the process is the same for mac)

1.  You should already be here, but if you aren't go to the Green Up Vermont GitHub page here : https://github.com/johnneed/GreenUpVermont

2. Click the green "Clone or download" button and then click the small "Copy to clipboard" icon to the right of the repository url.

![Alt](/docs/assets/Capture63.PNG "Clone Repository")

3. Open a terminal window, then type "git clone" and then hit ctrl v to paste the url from the repository

![Alt](/docs/assets/Capture74.PNG "Clone Repository")

4. After the cloning finishes, Install the project dependencies.  First navigate into the project folder by typing "cd GreenUpVermont" and then install the packages by typing "npm install"

![Alt](/docs/assets/Capture75.PNG "Clone Repository")


### Install XCode on Mac

1. Go to the App Store and look up Xcode on the search.

2. Download the first result by apple this will take several minutes as it is a large application.

### Install Genymotion

1. Genymotion.com

2. Go to download genymotion free edition

![Alt](/docs/assets/And1.png "And1")

3. Create account

4. Download for Mac

5. Activate account from email

6. Drag genymotion shell and genymotion icon to application folder


![Alt](/docs/assets/And2.png "And2")

### Set the ANDROID_HOME Environment Variable on Mac

1. First install homebrew with this command in terminal `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

2. Next past command `brew cask install android-sdk` in terminal. 

3. Now we need to set the Android Home Env. Var. To do with we need to find the path to the Android-SDK. Since we've installed it with brew it will be in `/usr/local/Cellar/android-sdk/`. Next run the command `export ANDROID_HOME={/usr/local/Cellar/android-sdk/}`. Then enter `export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools` in terminal and lastly, resource .bash_profile with `source ~/.bash_profile`.

### Create a New Android Virtual Device on Mac

7. Load genymotion

8. Click for personal use

![Alt](/docs/assets/And3.png "And3")

9. Create new virtual device

10. Sign in

![Alt](/docs/assets/And4.png "And4")

11. Select android device and name it GNVT Android

![Alt](/docs/assets/And5.png "And5")

12. After it downloads the simulator run the simulator

13. In terminal enter `cd GreenUpVermont` then `react-native run-android`

![Alt](/docs/assets/And6.png "And6")

14. Click on button with six dots on bottom of home screen

![Alt](/docs/assets/And7.png "And7")

15. Click on the Green Up Vermont App

![Alt](/docs/assets/And9.png "And9")

![Alt](/docs/assets/And8.png "And8")


