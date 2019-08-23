// @flow
import React, { Fragment, useEffect } from "react";
import { bindActionCreators } from "redux";
import * as actionCreators from "./actions";
import { connect } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import type { Node } from "react";


type Props = { isOffline: boolean, children: Node, actions: { setNetworkStatus: boolean => void } };

export const Klass = ({ actions }: Props): Node => {

    useEffect(() => {

        const handler = state => {
            actions.setNetworkStatus(state.isConnected || state.type !== "none");
        };
        // NetInfo.fetch().then(handler);
        const unsubscribe = NetInfo.addEventListener("connectionChange", handler);
        return unsubscribe.remove;
    }, [actions]);

    return (<Fragment>{ null }</Fragment>);
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actionCreators, dispatch)
});

const mapStateToProps = state => ({ isOffline: state.networkStatus.isOffline });

export const NetworkStatus = connect(mapStateToProps, mapDispatchToProps)(Klass);
