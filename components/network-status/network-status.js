// @flow
import React, { Fragment, useEffect } from "react";
import { bindActionCreators } from "redux";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import type { Node } from "react";

type PropsType = { isOffline: boolean, children: Node, actions: { setNetworkStatus: boolean => void } };

export const Klass = ({ actions }: PropsType): React$Element<Fragment> => {

    useEffect((): (()=>void) => {
        const handler = (state: Object) => {
            actions.setNetworkStatus(state.isConnected || state.type !== "none");
        };
        NetInfo.addEventListener("connectionChange", handler);
        return () => {
            NetInfo.removeEventListener("connectionChange", handler);
        };
    }, [actions]);

    return (<Fragment>{ null }</Fragment>);
};

const mapDispatchToProps = (dispatch: Dispatch<ActionType>): Object => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

const mapStateToProps = (state: Object): Object => ({ isOffline: state.networkStatus.isOffline });

export const NetworkStatus = connect(mapStateToProps, mapDispatchToProps)(Klass);
