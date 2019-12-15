// @flow
/* eslint-disable new-cap */
import React, { useState } from "react";
import { Dimensions, Text } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import TeamDetailsEditor from "../../components/team-details-editor";
import TeamMembersEditor from "../../components/team-members-editor";
import * as constants from "../../styles/constants";

const routes = [
    { key: "members", title: "Members" },
    { key: "details", title: "Details" }
];

const TeamEditorScreen = (): React$Element<any> => {

    const [activeTab, setActiveTab] = useState(0);
    const navState = { index: activeTab, routes };
    return (
        <TabView
            renderTabBar={ props =>
                <TabBar
                    { ...props }
                    indicatorStyle={ {
                        backgroundColor: constants.colorBackgroundDark,
                        color: constants.colorBackgroundDark
                    } }
                    style={ { backgroundColor: constants.colorBackgroundHeader } }
                    renderLabel={ ({ route, focused }) => (
                        <Text style={ { margin: 8, color: (focused ? "black" : "#555") } }>
                            { (route.title || "").toUpperCase() }
                        </Text>
                    ) }
                />
            }

            navigationState={ navState }
            renderScene={ SceneMap({
                details: TeamDetailsEditor,
                members: TeamMembersEditor
            }) }
            onIndexChange={ setActiveTab }
            initialLayout={ { width: Dimensions.get("window").width } }
        />
    );
};


TeamEditorScreen.navigationOptions = {
    title: "Manage Your Team",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
};


export default TeamEditorScreen;
