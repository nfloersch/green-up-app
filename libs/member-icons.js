// @flow
import * as memberStatuses from "../constants/team-member-statuses";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

const iconStyles = {
    ACCEPTED: { height: 30, width: 30, color: "#007AFF" },
    OWNER: { height: 30, width: 30, color: "#007AFF" },
    INVITED: { height: 30, width: 30, color: "#007AFF" },
    NOT_INVITED: { height: 30, width: 30, color: "#007AFF" },
    REQUEST_TO_JOIN: { height: 30, width: 30, color: "#007AFF" },
    IS_REQUESTING_TO_JOIN: { height: 30, width: 30, color: "#007AFF" }
};

export function getIconStyles(status: string) {
    return iconStyles[status] || { height: 30, width: 30, color: "#007AFF" };
}

const icons = {
    [memberStatuses.REQUEST_TO_JOIN]: Platform.OS === "ios" ? "ios-person-add" : "md-person-add",
    [memberStatuses.ACCEPTED]: Platform.OS === "ios" ? "ios-person" : "md-person",
    [memberStatuses.INVITED]: Platform.OS === "ios" ? "ios-mail" : "md-mail",
    [memberStatuses.OWNER]: Platform.OS === "ios" ? "ios-star" : "md-star",
    [memberStatuses.NOT_INVITED]: Platform.OS === "ios" ? "ios-close" : "md-close",
    IS_REQUESTING_TO_JOIN: Platform.OS === "ios" ? "ios-clock" : "md-clock"
};


export function getIconName(status: string) {
    return icons[status] || (Platform.OS === "ios" ? "ios-help" : "md-help");
}

export function getMemberIcon(memberStatus: string, style: Object = {}, isOwner: boolean) {
    const status = memberStatus === memberStatuses.REQUEST_TO_JOIN && !isOwner ? "IS_REQUESTING_TO_JOIN" : memberStatus;
    return (
        <Ionicons
            name={ getIconName(status) }
            size={ 30 }
            style={ Object.assign({}, getIconStyles(status), style) }/>
    );
}