// @flow
import * as memberStatuses from "../../constants/team-member-statuses";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import * as R from "ramda";
import * as constants from "../../styles/constants";

const icons = {
    [memberStatuses.REQUEST_TO_JOIN]: Platform.OS === "person-add",
    [memberStatuses.ACCEPTED]: Platform.OS === "person",
    [memberStatuses.INVITED]: Platform.OS === "mail",
    [memberStatuses.OWNER]: Platform.OS === "star",
    [memberStatuses.NOT_INVITED]: Platform.OS === "close",
    IS_REQUESTING_TO_JOIN: Platform.OS === "clock",
    DEFAULT: Platform.OS === "help"
};

const getIconName = R.cond([
    [(status: Object): boolean => status.isOwner === true, (): string => icons.OWNER],
    [(status: Object): boolean => status.status === memberStatuses.REQUEST_TO_JOIN, (): string => icons.IS_REQUESTING_TO_JOIN],
    [(status: Object): boolean => Object.keys(icons).includes(status.status), (status: Object): string => icons[status.status]],
    [R.T, (): string => icons.DEFAULT]
]);

type PropsType = { memberStatus: string, style?: Object, isOwner?: boolean, size?: number };

export const MemberIcon = ({ memberStatus, style = {}, isOwner, size = 35 }: PropsType): React$Element<Ionicons> => {
    const status = memberStatus === memberStatuses.REQUEST_TO_JOIN && !isOwner ? "IS_REQUESTING_TO_JOIN" : memberStatus;
    const iconStyle = Object.assign({
        height: size,
        width: size,
        color: constants.colorIcon
    }, style);
    return (
        <Ionicons
            name={ getIconName({ status, isOwner: Boolean(isOwner) }) }
            size={ size }
            style={ iconStyle }/>
    );
};