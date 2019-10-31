// @flow
/* eslint-disable new-cap */
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TeamEditorDetails from "../../components/team-editor-details";
import TeamEditorMembers from "../../components/team-editor-members";

const routes = [
    { key: "first", title: "Details" },
    { key: "second", title: "Members" }
];

const TeamEditorScreen = (): React$Element<any> => {

    const [activeTab, setActiveTab] = useState(0);
    const navState = { index: activeTab, routes };
    return (
        <TabView
            navigationState={ navState }
            renderScene={ SceneMap({
                first: TeamEditorDetails,
                second: TeamEditorMembers
            }) }
            onIndexChange={ setActiveTab }
            initialLayout={ { width: Dimensions.get("window").width } }
        />
    );
};

export default TeamEditorScreen;
