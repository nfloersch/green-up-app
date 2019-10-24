// @flow
import * as memberStatuses from "../../constants/team-member-statuses";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import * as R from "ramda";
import colors from "../../constants/colors";

const icons = {
    [memberStatuses.REQUEST_TO_JOIN]: Platform.OS === "ios" ? "ios-person-add" : "md-person-add",
    [memberStatuses.ACCEPTED]: Platform.OS === "ios" ? "ios-person" : "md-person",
    [memberStatuses.INVITED]: Platform.OS === "ios" ? "ios-mail" : "md-mail",
    [memberStatuses.OWNER]: Platform.OS === "ios" ? "ios-star" : "md-star",
    [memberStatuses.NOT_INVITED]: Platform.OS === "ios" ? "ios-close" : "md-close",
    IS_REQUESTING_TO_JOIN: Platform.OS === "ios" ? "ios-clock" : "md-clock",
    DEFAULT: Platform.OS === "ios" ? "ios-help" : "md-help"
};

const getIconName = R.cond([
    [(status: string, isOwner: boolean): boolean => isOwner === true, (): string => icons.OWNER],
    [(status: string): boolean => status === memberStatuses.REQUEST_TO_JOIN, (): string => icons.IS_REQUESTING_TO_JOIN],
    [(status: string): boolean => Object.keys(icons).includes(status), (status: string): string => icons[status]],
    [R.T, (): string => icons.DEFAULT]
]);

type PropsType = { memberStatus: string, style: Object, isOwner: boolean };

export const MemberIcon = ({ memberStatus, style = {}, isOwner }: PropsType): React$Element<Ionicons> => {
    const status = memberStatus === memberStatuses.REQUEST_TO_JOIN && !isOwner ? "IS_REQUESTING_TO_JOIN" : memberStatus;
    const iconStyle = Object.assign({
        height: 30,
        width: 30,
        color: colors.iconColor // "#007AFF"
    }, style);
    return (
        <Ionicons
            name={ getIconName(status) }
            size={ 30 }
            style={ iconStyle }/>
    );
};