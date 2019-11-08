// @flow
import React, { useState, useEffect } from "react";
import {
    Image,
    TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

type PropsType = {
    children: any,
    containerStyle: Object,
    maxHeight: number,
    maxWidth: number,
    format: string,
    onError: any => void,
    onChange: any => void,
    onCancel: any => void,
    imagePickerProps: any => void,
    style: object
};

const resize = async (height: number, width: number, rotate: number, image: Object): Object => {
    const newImage = await ImageManipulator.manipulateAsync(
        image.uri,
        [{ rotate }, { resize: { height } }, { crop: { originX: 0, originY: 0, width, height } }],
        { compress: 1, format: ImageManipulator.SaveFormat.PNG, base64: true }
    );
    return newImage;
};

const getPermissionAsync = async (callback: boolean => any): void => {
    if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== "granted") {
            alert("Sorry, we need camera roll permissions to make this work!");
            callback(false);
            return;
        }
        callback(true);
    }
};

export const PhotoPicker = ({ maxHeight = 200, maxWidth = 200, onCancel, onError, onChange, style, format = ImageManipulator.SaveFormat.PNG, children }: PropsType) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [hasCameraRollPermissions, setCameraRollPermission] = useState(false);

    const openImagePicker = async () => {
        setButtonDisabled(true);

        // get image from image picker
        try {
            const { height, width, cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (cancelled) {
                console.log("User cancelled image picker");
                if (onCancel) {
                    onCancel("User cancelled image picker");
                }
                return;
            }
            const resized = await resize(maxHeight, maxWidth, 0, { height, width, uri });

            if (onChange) {
                onChange(resized);
            }

        }
        catch (error) {
            if (onError) {
                onError(error);
            }

        }
    };


    useEffect(() => {
        if (!hasCameraRollPermissions) {
            getPermissionAsync(setCameraRollPermission);
        }
    }, []);

    return (

        <TouchableOpacity
            style={ style }
            onPress={ openImagePicker }
            disabled={ !hasCameraRollPermissions || buttonDisabled }
        >
            { children }
        </TouchableOpacity>
    );

};


