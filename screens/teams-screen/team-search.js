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
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from './actions';
import {defaultStyles} from '../../styles/default-styles';

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

const myStyles = {
    scrollview: {
        marginTop: 10
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamSearch extends Component {
    static propTypes = {
        actions: PropTypes.object,
        teams: PropTypes.object,
        navigation: PropTypes.object,
        searchResults: PropTypes.array,
        currentUser: PropTypes.object
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
        const searchResults = Object.keys(this.props.teams)
            .filter(key => teams[key].isPublic === true || teams[key].members.find(m => m.uid === this.props.currentUser.uid))
            .map(key => ({
                key,
                score: searchScore(searchTerm, [teams[key].name, teams[key].description, teams[key].town])
            }))
            .filter(score => (score.score > 0))
            .sort((score1, score2) => (score2.score - score1.score))
            .map(score => score.key);
        this.setState({searchResults, searchTerm});
    }


    toTeamDetail(teamId) {
        return () => {
            const team = this.props.teams[teamId];
            this.props.actions.selectTeam(team);
            this.props.navigation.navigate('TeamDetails');
        };
    }

    render() {
        const teams = this.props.teams;
        const searchResults = this.state.searchResults.map(teamId => (
            <TouchableHighlight
                key={teamId} style={styles.searchResult}
                onPress={this.toTeamDetail(teamId)}
            >
                <Text style={styles.searchResultsTitle}>{teams[teamId].name}</Text>
            </TouchableHighlight>
        ));
        return (
            <View style={styles.container}>
                <View style={{marginTop: 10}}>
                    <TextInput
                        keyBoardType={'default'} onChangeText={this.onSearchTermChange}
                        placeholder={'Search Teams'}
                        style={styles.textInput}
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

const mapStateToProps = (state) => ({
    teams: state.teams.teams,
    currentUser: state.login.user
});

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
