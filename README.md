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
  - [Clone the Green Up Vermont repository](#clone-the-green-up-vermont-repository)
  - [Run the PRoject](#run-the-project)

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

1. Go to the download page for Android Studio here : https://developer.android.com/studio/index.html

2. Click the first download button and accept the licensing agreement and click the second download button to begin the download.

3. Launch the installer

![Alt](/docs/assets/Capture19.PNG "Android Studio Install 1")

4. On the "Choose Components" screen, select all components for installation.

![Alt](/docs/assets/Capture20.PNG "Android Studio Install 2")

5. Accept the License Agreement

![Alt](/docs/assets/Capture21.PNG "Android Studio Install 3")

6. On the "Configuration Settings" screen, change the "Android SDK Installation Location" to C:\Android\sdk.  This will avoid a possible problem later.

![Alt](/docs/assets/Capture72.PNG "Android Studio Install 4")

7. Accept the default menu folder.  When the initial installation is finished, start Android Studio.

![Alt](/docs/assets/Capture23.PNG "Android Studio Install 5")

8. Begin configuring Android Studio by clicking "next" on the initial screen

![Alt](/docs/assets/Capture24.PNG "Android Studio Install 6")

9. Choose "Custom" for the type of setup.

![Alt](/docs/assets/Capture25.PNG "Android Studio Install 7")

10. Choose which theme you prefer.

![Alt](/docs/assets/Capture26.PNG "Android Studio Install 8")

11. Choose "Custom" for the type of setup.

![Alt](/docs/assets/Capture26.PNG "Android Studio Install 9")


12. Install the AVD and HAXM. Make sure the boxes next to all of the following are checked:

  * Android SDK
  * Android SDK Platform
  * Performance (Intel ® HAXM)
  * Android Virtual Device

Then, click "Next" to install all of these components.

![Alt](/docs/assets/Capture27.PNG "Android Studio Install 10")

13. Set your RAM allocation to 2048 MiB (2Gib)

![Alt](/docs/assets/Capture28.PNG "Android Studio Install 11")

14. Verify your settings and click "Finish"

![Alt](/docs/assets/Capture29.PNG "Android Studio Install 12")


15. We will now need to configure an Android emulator. To get to the main screen

![Alt](/docs/assets/Capture31.PNG "Android Studio Install 14")

16.

![Alt](/docs/assets/Capture32.PNG "Android Studio Install 15")

17.

![Alt](/docs/assets/Capture33.PNG "Android Studio Install 16")

18.

![Alt](/docs/assets/Capture34.PNG "Android Studio Install 17")

19.

![Alt](/docs/assets/Capture35.PNG "Android Studio Install 18")

20.

![Alt](/docs/assets/Capture36.PNG "Android Studio Install 19")

21.

![Alt](/docs/assets/Capture37.PNG "Android Studio Install 20")

22.

![Alt](/docs/assets/Capture38.PNG "Android Studio Install 21")

23.

![Alt](/docs/assets/Capture39.PNG "Android Studio Install 22")

24.

![Alt](/docs/assets/Capture40.PNG "Android Studio Install 23")

25.

![Alt](/docs/assets/Capture41.PNG "Android Studio Install 24")

26.

![Alt](/docs/assets/Capture42.PNG "Android Studio Install 25")

### Clone the Green Up Vermont repository

1.  You should already be here, but if you aren't go to the Green Up Vermont GitHub page here : https://github.com/johnneed/GreenUpVermont

2. Click the green "Clone or download" button and then click the small "Copy to clipboard" icon to the right of the repository url.

![Alt](/docs/assets/Capture63.PNG "Clone Repository")

3. Open a terminal window, then type "git clone" and then hit ctrl v to paste the url from the repository

![Alt](/docs/assets/Capture74.PNG "Clone Repository")

4. After the cloning finishes, Install the project dependencies.  First navigate into the project folder by typing "cd GreenUpVermont" and then install the packages by typing "npm install"

![Alt](/docs/assets/Capture75.PNG "Clone Repository")

### Run the Project
