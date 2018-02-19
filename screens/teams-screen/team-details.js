/**
 * GreenUpVermont React Native App
 * https://github.com/johnneed/GreenUpVermont
 * @flow
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, ScrollView, View} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from './actions';
import {defaultStyles} from  '../../styles/default-styles';

const myStyles = {
	teamTitle: {
		backgroundColor: 'darkseagreen',
		paddingTop: 10,
		paddingBottom: 10
	},
	dataBlock: {
		marginTop: 10,
		marginBottom: 10
	}
};

const combinedStyles = Object.assign({},defaultStyles,myStyles);
const styles = StyleSheet.create(combinedStyles);

class TeamDetails extends Component {
    static propTypes = {
        actions: PropTypes.object,
        selectedTeam: PropTypes.object
    };

    static navigationOptions = {
        title: 'Team Details'
    };
    constructor(props) {
        super(props);
    }

    render() {
        const {selectedTeam} = this.props;
        return (
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={[styles.heading2, styles.teamTitle]}>
									{selectedTeam.name}
								</Text>
                <View style={{alignSelf: 'flex-start'}}>
									<Text style={styles.dataBlock}>
											<Text style={styles.label}>{'Where: '}</Text>
											<Text style={styles.data}>{selectedTeam.location}, {selectedTeam.town}</Text>
									</Text>
									<Text style={styles.dataBlock}>
											<Text style={styles.label}>{'Start: '}</Text>
											<Text style={styles.data}>{selectedTeam.start}</Text>
									</Text>
									<Text style={styles.dataBlock}>
											<Text style={styles.label}>{'Ends: '}</Text>
											<Text style={styles.data}>{selectedTeam.end}</Text>
									</Text>
									<Text style={styles.dataBlock}>
											<Text style={styles.label}>{'Notes: '}</Text>
											<Text>{selectedTeam.notes}</Text>
									</Text>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => {
    return {
			selectedTeam: state.teams.selectedTeam
		};
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
