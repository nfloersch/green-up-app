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
  - [Set the ANDROID_HOME Environment Variable](#set-the-android_home-environment-variable)
  - [Create a New Android Virtual Device](#create-a-new-android-virtual-device)
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

11. Install the AVD and HAXM. Make sure the boxes next to all of the following are checked:

  * Android SDK
  * Android SDK Platform
  * Performance (Intel ® HAXM)
  * Android Virtual Device

Then, click "Next" to install all of these components.

![Alt](/docs/assets/Capture27.PNG "Android Studio Install 10")

12. Set your RAM allocation to 2048 MiB (2Gib)

![Alt](/docs/assets/Capture28.PNG "Android Studio Install 11")

13. Verify your settings and click "Finish"

![Alt](/docs/assets/Capture29.PNG "Android Studio Install 12")


14. We will now need to configure an Android emulator. To get to the main screen, select "start a new Android Stuoio project"

![Alt](/docs/assets/Capture31.PNG "Android Studio Install 14")

15. We won't be using this project for anything, so accept the default name. You may need to change the project location if your home folder contains spaces.  If set the project location to "C:\MyAndroidProjects\MyApplication".

![Alt](/docs/assets/Capture32.PNG "Android Studio Install 15")

16. Uncheck all except "Phone and Tablet".  The Minimum SDK should be set at "API 15: Android 4.0.3 (IceCream Sandwich)""

![Alt](/docs/assets/Capture33.PNG "Android Studio Install 16")

17. Choose "Basic Activity"

![Alt](/docs/assets/Capture34.PNG "Android Studio Install 17")

18. Click "Finish"

![Alt](/docs/assets/Capture35.PNG "Android Studio Install 18")

19.  If you get a firewall warning click "Allow access"  

![Alt](/docs/assets/Capture36.PNG "Android Studio Install 19")

20.  You should now be at the main screen.  We need to install the correct SDK versions.  Select Tools >> Android >> SDK Manager

![Alt](/docs/assets/Capture37.PNG "Android Studio Install 20")

23. Select the "SDK Platforms" tab Click the "Show Package Details" checkbox near the bottom right and the select the following under "Android 6.0 (Marshmallow)"

  * Google APIs
  * Android SDK Platform 23
  * Sources for Android 23
  * Intel x86 Atom_64 System Image
  * Google APIs Intel x86 Atome_64 System Image

![Alt](/docs/assets/Capture40.PNG "Android Studio Install 23")

24. Select the "SDK Tools tab Click the "Show Package Details" checkbox near the bottom right.  Select the following

  * 23.0.1

![Alt](/docs/assets/Capture41.PNG "Android Studio Install 24")

25. Click "OK" to start the installation.

![Alt](/docs/assets/Capture42.PNG "Android Studio Install 25")


## Set the ANDROID_HOME Environment Variable

1. We need to set the ANDROID_HOME path variable.  To start this open up the control panel, You can find it by typing "Control Panel" in the search bar. Then click "System and Security"

![Alt](/docs/assets/Capture48.PNG "Set ANDROID_HOME 1")

2. Select "System"

![Alt](/docs/assets/Capture49.PNG "Set ANDROID_HOME 2")

3. Select "Advanced system settings"

![Alt](/docs/assets/Capture50.PNG "Set ANDROID_HOME 3")

4. Choose the "Advanced" tab and click the "Environment Variables..." button

![Alt](/docs/assets/Capture51.PNG "Set ANDROID_HOME 4")

5. Click the "New..." button under "User variables"

![Alt](/docs/assets/Capture52.PNG "Set ANDROID_HOME 5")

6. Set the variable name to "ANDROID_HOME" and the variable value to "C:\Android\sdk".  If this is not where you installed the sdk you will need to point this value to the correct path.

![Alt](/docs/assets/Capture53.PNG "Set ANDROID_HOME 6")

7. Verify that your ANDROID_HOME variable is set correctly.

![Alt](/docs/assets/Capture54.PNG "Set ANDROID_HOME 7")

### Create a New Android Virtual Device

1. Open Android Studio and select Tools >> Android >> AVD Manager

![Alt](/docs/assets/Capture55.PNG "Create a New Android Virtual Device 1")

2. Click the "Create Virtual Device" button

![Alt](/docs/assets/Capture56.PNG "Create a New Android Virtual Device 2")

3. Select the Nexus 5x device under the Phone category, then click "Next"

![Alt](/docs/assets/Capture57.PNG "Create a New Android Virtual Device 3")

4. Under the "x86 Images" tab, choose the "Marshmallow API 23 | ABI | x86_64" Image.  Click "Next"

![Alt](/docs/assets/Capture60.PNG "Create a New Android Virtual Device 4")


5. Change the AVD Name to "GreenUpVT" and click "Finish"

![Alt](/docs/assets/Capture61.PNG "Create a New Android Virtual Device 5")

6. Verify that you created a new device.

![Alt](/docs/assets/Capture62.PNG "Create a New Android Virtual Device 6")

### Clone the Green Up Vermont repository

1.  You should already be here, but if you aren't go to the Green Up Vermont GitHub page here : https://github.com/johnneed/GreenUpVermont

2. Click the green "Clone or download" button and then click the small "Copy to clipboard" icon to the right of the repository url.

![Alt](/docs/assets/Capture63.PNG "Clone Repository")

3. Open a terminal window, then type "git clone" and then hit ctrl v to paste the url from the repository

![Alt](/docs/assets/Capture74.PNG "Clone Repository")

4. After the cloning finishes, Install the project dependencies.  First navigate into the project folder by typing "cd GreenUpVermont" and then install the packages by typing "npm install"

![Alt](/docs/assets/Capture75.PNG "Clone Repository")

### Run the Project

1. Start Android Studio.
