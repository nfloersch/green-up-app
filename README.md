# Green Up Vermont
Summer of Civic Hacking
A mobile app for Vermont's Green Up Day.

## Table of Contents

- [Setting Up Your Development Environment on Windows](#setting-up-your-development-environment-on-windows)
  - [Install Python 2](#install-python-2)
  - [Install Node](#install-node)
  - [Install and Configure Atom](#install-and-configure-atom)
  - [Install Meld](#install-meld)
  - [Install and Configure Git](#install-and-configure-git)
  - [Install Java 8 JDK](#install-java-8-jdk)
  - [Install React Native](#install-react-native)
  - [Install and Configure Android Studio](#install-and-configure-android-studio)

## Setting Up Your Development Environment on Windows

These instructions are for Windows 10 - 64 bit.

### Install Python 2

1. Download the Python2 installer here : https://www.python.org/ftp/python/2.7.13/python-2.7.13.amd64.msi
2. Launch the installer.

![Alt](/docs/assets/Capture44.PNG "Python Installer")

3. Selected the default install location

![Alt](/docs/assets/Capture45.PNG "Python Installer 2")

4. On the "Customize Python" screen, select "Add python.exe to Path."

![Alt](/docs/assets/Capture46.PNG "Python Installer 3")

5. Continue through the wizard using the default settings

6. Verify that Python 2 is installed by opening a terminal.  You open a terminal by typing "cmd" in the windows search bar and choosing "command prompt."  in the terminal type `python --version`  you should see "Python 2.7.13"

![Alt](/docs/assets/Capture67.PNG "Confirm Python")

### Install Node

1. Download the Node installer here : https://nodejs.org/dist/v7.10.0/node-v7.10.0-x86.msi

2. Launch the installer.

![Alt](/docs/assets/Capture03.PNG "Node Installer")

3. Click through the installer accepting all the default settings.

6. Verify that Node  is installed by opening a terminal and typing `node --version`  you should see "v7.10.0"

![Alt](/docs/assets/Capture68.PNG "Verify Node")


### Install and Configure Atom

1. Download the Atom installer here : https://atom.io/download/windows_x64

2. Launch the installer and acknowledge that you want to run the file.

![Alt](/docs/assets/Capture10.PNG "Atom Installer")

3. Click through the installer accepting all the default settings.

4. Launch Atom by typing "atom" in the search bar.  You may want to add Atom to your task bar by right-clicking the Atom icon and selecting "Pin to taskbar"

![Alt](/docs/assets/Capture69.PNG "Launch Atom")

5. You will need to install the Nuclide package which is an IDE package for React-Native created by Facebook.  On the Atom Welcome Guide Screen, click "Install a Package"

![Alt](/docs/assets/Capture11.PNG "Welcome Screen")

6. In the Settings search box type "nuclide" an click "Packages".  Then click "install" for "nuclide" and "nuclide-format-js"

![Alt](/docs/assets/Capture12.PNG "Install Pacakges")

### Install Meld

1. Download the Meld installer here : https://download.gnome.org/binaries/win32/meld/3.16/Meld-3.16.2-win32.msi

2. Launch the installer.

3. Click through the installer accepting all the default settings.

4. If you want, pin Meld to your taskbar like you did Atom.

### Install and Configure Git

1. Download the Git installer here : https://git-scm.com/download/win

2. Launch the installer.

![Alt](/docs/assets/Capture70.PNG "Git Installer")

3. Click through the installer accepting all the default settings.

4. Verify that Node  is installed by opening a terminal and typing `node --version`  you should see "git version 2.14.0.windows.1"

![Alt](/docs/assets/Capture71.PNG "Verify Git")

5. Set your name and email in Git using the following commands in the terminal.

```
git config --global user.name "YOUR NAME"
git config --global user.email your.email@somecompany.com
```

![Alt](/docs/assets/Capture08.PNG "Git Config")


### Install Java 8 JDK

1. Go to the Download page for the Java 8 JDK here : http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html

2. Accept the licensing agreement and click the download link for Windows x64.

![Alt](/docs/assets/Capture04.PNG "Java JDK Download")

3. Launch the installer.

![Alt](/docs/assets/Capture05.PNG "Java JDK Installer")

4. Click through the installer accepting all the default settings.

5. Verify that Java is installed by launching a terminal window and typing `java -version`.  You should should see 'java version "1.8.0_131"'

### Install React Native

1. Open a terminal window and install React Native Command Line Interface using the Node Package Manager by typing `npm install -g react-native-cli`

2. Verify that React Native is installed by typing `react-native -version`  You should see "react-native-cli: 2.0.1"

### Install and Configure Android Studio
