// @flow
// eslint-disable new-cap 0
import React from 'react';
import {Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import TeamEditorDetails from '../../components/team-editor-details';
import TeamEditorMap from '../../components/team-editor-map';
import TeamEditorMembers from '../../components/team-editor-members';

const Details = () => (
    <TeamEditorDetails/>
);
const Map = () => (
    <TeamEditorMap/>
);

const Members = () => (
    <TeamEditorMembers/>
);
export default class TeamEditorScreen extends React.Component {
    state = {
        index: 0,
        routes: [
            {key: 'first', title: 'Details'},
            {key: 'second', title: 'Members'},
            {key: 'third', title: 'Map'}
        ]
    };

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={
                    SceneMap( // eslint-disable-line new-cap, babel/new-cap
                        {
                            first: Details,
                            second: Members,
                            third: Map
                        }
                    )
                }
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: Dimensions.get('window').width}}
            />
        );
    }
}
