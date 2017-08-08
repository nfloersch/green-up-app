/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as teamActions from './team-actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: '100%',
        marginBottom: 5
    },
    teams: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    column: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#678',
        padding: 3,
        width: '100%'
    },
    scrollview: {
        width: '100%',
        marginTop: 5
    }
});
class TeamSearch extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.array,
        navigation: PropTypes.object,
        searchResults: PropTypes.array
    };

    static navigationOptions = {
        title: 'Find a Team'
    };
    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
        this.state = {
            searchTerm: ''
        };

    }

    onSearchTermChange(text) {
        this.setState({searchTerm: text});
    }

    onSearchButtonPress() {
        this.props.actions.searchForTeams(this.state.searchTerm);
    }

    toTeamDetail(team) {
        return () => {
            this.props.actions.selectTeam(team);
            this.props.navigation.navigate('TeamDetails');
        };
    }

    render() {
        var teams = this.props.searchResults.map(team => (
            <TouchableHighlight key={team.uid} style={styles.column}
                onPress={this.toTeamDetail(team)}
            >
                <View>
                    <Text style={styles.teams}>{team.name}</Text>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TextInput keyBoardType={'default'} onChangeText={this.onSearchTermChange}
                        placeholder={'search teams'} style={{
                            width: '80%'
                        }}
                        value={this.state.searchTerm}
                    />
                    <Button onPress={this.onSearchButtonPress} title={'search'}/>
                </View>
                <ScrollView style={styles.scrollview}>
                    {teams}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {searchResults: state.teamReducers.teamSearchResults};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
