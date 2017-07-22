/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
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
        navigation: PropTypes.object
    };

    static navigationOptions = {
        title: 'Find a Team'
    };
    constructor(props) {
        super(props);
        this.toTeamDetail = this.toTeamDetail.bind(this);
    }

    toTeamDetail() {
        this.props.navigation.navigate('TeamDetails');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.column}>
                    <TextInput keyBoardType={'default'}
                        placeholder={'search teams'}
                        style={{width: '80%'}}
                    />
                    <Button title={'search'} />
                </View>
                <ScrollView style={styles.scrollview}>
                    <TouchableHighlight style={styles.column} onPress={this.toTeamDetail}>
                        <View>
                            <Text style={styles.teams}>{'Team 1'}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column} onPress={this.toTeamDetail}>
                        <View>
                            <Text style={styles.teams}>{'Team 2'}</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.column} onPress={this.toTeamDetail}>
                        <View>
                            <Text style={styles.teams}>{'Team 3'}</Text>
                        </View>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {teams: state.teamReducers.session.user.teams};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(teamActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamSearch);
