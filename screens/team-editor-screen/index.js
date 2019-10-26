// @flow
// eslint-disable new-cap 0
import React, { useState } from "react";
import { Dimensions } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import TeamEditorDetails from "../../components/team-editor-details";
import TeamEditorMap from "../../components/team-editor-map";
import TeamEditorMembers from "../../components/team-editor-members";


type DetailPropsType = { goBack: () => void };
const Details = ({ goBack }: DetailPropsType): React$Element<any> => (<TeamEditorDetails goBack={ goBack }/>);
const Map = (): React$Element<any> => (<TeamEditorMap/>);
const Members = (): React$Element<any> => (<TeamEditorMembers/>);

const routes = [
    { key: "first", title: "Details" },
    { key: "second", title: "Members" },
    { key: "third", title: "Map" }
];

type PropsType = { navigation: Object };

const TeamEditorScreen = ({ navigation }: PropsType): React$Element<any> => {

    const [activeTab, setActiveTab] = useState(0);

    return (
        <TabView
            navigationState={ { state: activeTab, routes } }
            renderScene={
                SceneMap( // eslint-disable-line new-cap, babel/new-cap
                    {
                        first: (): React$Element<any> => (<Details goBack={ navigation.goBack }/>),
                        second: Members,
                        third: Map
                    }
                )
            }
            onIndexChange={ setActiveTab }
            initialLayout={ { width: Dimensions.get("window").width } }
        />
    );
};


export default TeamEditorScreen;
