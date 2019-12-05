#!/bin/sh

#
# FreeSee update script.
# 2013/10/18 - added support for updates embedded to installer
# 2018/11/27 - removed mountAsDMG functionality

WORKING_DIR=$1
PARENT_PID=$2
DEPLOY_DIR=$3
PARENT_PATH=$4
CMD_LINE_PARAMS=$5
CMD_ON_SUCCESS=$6
BINARY_NAME=$7

LOG_PATH=~/Library/Application\ Support/com.freesee.${FS_PRODUCT_NAME}/logging/FreeSee-update.log

BUNDLE_TYPE="zip" # possible options "dmg" | "zip"

logger()
{
	echo "["`date "+%Y-%m-%d %H:%M:%S"`"] [$$] $1" >> $LOG_PATH
}


if [ $# -ne 7 ]; then
	logger "Wrong number of arguments"
	exit 1
fi

logger "--------------------------------------------------------------------------"

logger " * working dir: $WORKING_DIR"
logger " * parent pid:  $PARENT_PID"
logger " * deploy dir:  $DEPLOY_DIR"
logger " * parent path: $PARENT_PATH"
logger " * product name: $FS_PRODUCT_NAME"
logger " * command line: $CMD_LINE_PARAMS"
logger " * success cmd: $CMD_ON_SUCCESS"
logger " * installer name: $BINARY_NAME"

logger "Waiting while parent process will terminate..."

PARENT_TIMEOUT=5000
while [ $PARENT_TIMEOUT -gt 0 ]; do
	ps -p $PARENT_PID >> $LOG_PATH
	if [ $? -eq 0 ]; then
		PARENT_TIMEOUT=$(($PARENT_TIMEOUT - 100))
		sleep .100
	else
		break
	fi
done

if [ $PARENT_TIMEOUT -le 0 ]; then
	logger "Killing parent process (sending KILL) ..."
    kill -9 $PARENT_PID >> $LOG_PATH
fi

mountAsZIP() {
BUNDLE_TYPE="zip"
logger "Try to handle as .ZIP file ..."
unzip "$WORKING_DIR/$BINARY_NAME" -d "$WORKING_DIR/img" >> $LOG_PATH
return $?
}

unmountInstaller() {

if [ "$BUNDLE_TYPE" = "zip" ]; then
logger "Cleaning zip image ..."
rm -rf "$WORKING_DIR/img"
fi

}

mountAsZIP
if [ $? -ne 0 ]; then
    logger "report error"
    $PARENT_PATH/Contents/MacOS/${FS_PRODUCT_NAME} -u 4 &
    exit 1
fi

FS_INSTALLER_NAME=`ls $WORKING_DIR/img/ | grep -o ".*\.app" | grep -o "\w*"`

if [ ! -e "$WORKING_DIR/img/${FS_INSTALLER_NAME}.app/Contents/MacOS/${FS_INSTALLER_NAME}" ]; then
    logger "Failed to find FreeSee binary in mounted image: Aborting."
    logger "$WORKING_DIR/img/${FS_INSTALLER_NAME}.app/Contents/MacOS/${FS_INSTALLER_NAME}"
    $PARENT_PATH/Contents/MacOS/${FS_PRODUCT_NAME} -u 4 &
    exit 1
fi

CMD_LINE="$CMD_ON_SUCCESS $CMD_LINE_PARAMS"

logger "Launching application installer..."
logger "$WORKING_DIR/img/${FS_INSTALLER_NAME}.app/Contents/MacOS/${FS_INSTALLER_NAME} { ${CMD_LINE} }"
$WORKING_DIR/img/${FS_INSTALLER_NAME}.app/Contents/MacOS/${FS_INSTALLER_NAME} ${CMD_LINE}
if [ $? -ne 0 ]; then
    unmountInstaller
    logger "Failed to launch installer. Aborting."
    exit 1
fi

unmountInstaller
