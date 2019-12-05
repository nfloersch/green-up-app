#!/bin/sh

#  uninstaller.sh
#  StartMeetingInstaller
#
#  Created by Oleksandr Skrypnyk on 26/07/16.
#

echo "Script `basename $0` is running from `dirname $(pwd) `"
APP_NAME="$(basename $(pwd))"
APP_SCHEME=$(echo "${APP_NAME}" | tr '[:upper:]' '[:lower:]' | tr '_' '-')

echo "appname is ${APP_NAME}, app-scheme=${APP_SCHEME}"

#clean url schemes
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -u /Applications/${APP_NAME}.app

#delete .app and alias
if [ -a ~/Applications/${APP_NAME}.app ];
then
chflags nouchg ~/Applications/${APP_NAME}.app
rm -Rfv ~/Applications/${APP_NAME}.app
fi
if [ -a ~/Desktop/${APP_NAME}.app ];
then
rm -fv ~/Desktop/${APP_NAME}.app
fi

#delete preferences
defaults delete com.freesee.${APP_SCHEME}
killall -u $USER cfprefsd

#delete log files
rm -Rfv ~/Library/${APP_NAME}

#clean web plugins
rm -fv ~/Library/Internet\ Plug-Ins/FreeConferenceCallChromeHostPlugin
rm -Rfv ~/Library/Internet\ Plug-Ins/FreeConferenceCallPlugin.plugin
rm -fv ~/Library/Application\ Support/Google/Chrome/NativeMessagingHosts/com.freeconferencecall.nativemessagingapi.json