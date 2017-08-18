/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
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

/**
 *
 * @param {string} term
 * @param {string[]} searchableString - things we search
 * @returns {number} the number of matches
 */
function searchScore(term: string, searchableString: [string]) {
    const terms = term.trim().split(' ');
    const testTerm = terms[0].toLowerCase();
    const score = searchableString.reduce((_score, interrogee) => (_score + (typeof interrogee === 'string' && interrogee.toLowerCase().indexOf(testTerm) > -1 ? 1 : 0))
        , 0);
    return (terms.length <= 1) ? score : score + searchScore(terms.slice(1).join(' '), searchableString);

}


class TeamSearch extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.object,
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
        this.state = {
            searchTerm: '',
            searchResults: []
        };

    }

    onSearchTermChange(searchTerm) {
        const teams = this.props.teams;
        const searchResults = Object.keys(this.props.teams).map(key => ({
            key,
            score: searchScore(searchTerm, [teams[key].name, teams[key].description, teams[key].town])
        }))
            .filter(score => (score.score > 0))
            .sort((score1, score2) => (score2.score - score1.score))
            .map(score => score.key);
        this.setState({searchResults, searchTerm});
    }


    toTeamDetail(team) {
        return () => {
            this.props.actions.selectTeam(team);
            this.props.navigation.navigate('TeamDetails');
        };
    }

    render() {
        const teams = this.props.teams;
        const searchResults = this.state.searchResults.map(teamId => (
            <TouchableHighlight
                key={teamId} style={styles.column}
                onPress={this.toTeamDetail(teamId)}
            >
                <View>
                    <Text style={styles.teams}>{teams[teamId].name}</Text>
                </View>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TextInput
                        keyBoardType={'default'} onChangeText={this.onSearchTermChange}
                        placeholder={'search teams'}
                        style={{
                            width: '80%'
                        }}
                        value={this.state.searchTerm}
                    />
                </View>
                <ScrollView style={styles.scrollview}>
                    {searchResults}
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {teams: state.teamReducers.teams};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
