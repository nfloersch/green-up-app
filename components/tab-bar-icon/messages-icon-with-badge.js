//  @flow
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    View
} from "react-native";
import colors from "../../constants/colors";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";

const myStyles = {
    badge: {
        position: "absolute",
        right: -6,
        top: -3,
        backgroundColor: "red",
        borderRadius: 6,
        width: 12,
        height: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    badgeCount: {
        color: "white", fontSize: 10, fontWeight: "bold"
    }
};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

const MessagesIconWithBadge = ({ focused, name, unreadMessageCount }: { focused: boolean, name: string, unreadMessageCount: number }): React$Element<Ionicons> =>
    (<View>
        <Ionicons
            name={ name }
            size={ 26 }
            style={ { marginBottom: -3 } }
            color={ focused ? colors.tabIconSelected : colors.tabIconDefault }
        />
        { !!unreadMessageCount &&
            (<View style={ styles.badge }>
                <Text style={ styles.badgeCount }>{ unreadMessageCount }</Text>
            </View>)}
    </View>);

const mapStateToProps = (state: Object): Object => {

    const messages = Object
        .values((state.messages || {}).messages || {})
        .reduce((obj: Object, queue: Object): Object => ({ ...obj, ...queue }), {});

    return {
        unreadMessageCount: Object.values(messages).filter(msg => !msg.read).length
    };
};

// $FlowFixMe
export default connect(mapStateToProps)(MessagesIconWithBadge);
