// @flow
import React, { Component } from "react";
import { StyleSheet, KeyboardAvoidingView, ScrollView, View, FlatList, TextInput, Platform } from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./actions";
import { defaultStyles } from "../../styles/default-styles";
import TownItem from "../../components/town-item";

const styles = StyleSheet.create(defaultStyles);

type Props = {
    actions: Object,
    currentUser: Object,
    profile: Object,
    navigation: Object,
    towns: Object
};

class FreeSupplies extends Component<Props> {

    static navigationOptions = {
        title: "Find Bags, Gloves, and Other Stuff"
    };

    constructor(props) {
        super(props);
        this.onSearchTermChange = this.onSearchTermChange.bind(this);
        this.state = { searchResults: [], searchTerm: "" };
    }

    onSearchTermChange(searchTerm) {
        const towns = this.props.towns;
        const searchResults = Object.keys(this.props.towns).filter(key => (towns[key].name || "").toLowerCase().indexOf(searchTerm.trim().toLowerCase()) !== -1);
        this.setState({ searchResults, searchTerm: searchTerm.trim() });
    }

    render() {
        const towns = this.props.towns;
        const keys = this.state.searchTerm ? this.state.searchResults : Object.keys(towns);
        const locations = keys.map(key => ({ key, ...(towns[key] || {}) }));

        return (
            <View style={ styles.frame }>
                <View style={ { margin: 10 } }>
                    <TextInput
                        keyBoardType={ "default" }
                        onChangeText={ this.onSearchTermChange }
                        placeholder={ "Search by City/Town" }
                        style={ styles.textInput }
                        value={ this.state.searchTerm }
                        underlineColorAndroid={ "transparent" }
                    />
                </View>
                <KeyboardAvoidingView
                    style={ defaultStyles.frame }
                    behavior={ Platform.OS === "ios" ? "padding" : null }
                >
                    <ScrollView style={ styles.scroll }>
                        <View style={ styles.infoBlockContainer }>
                            <FlatList
                                style={ styles.infoBlockContainer }
                                data={ locations }
                                renderItem={ ({ item }) => (<TownItem item={ item }/>) }/>
                        </View>
                        <View style={ defaultStyles.padForIOSKeyboard }/>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        );
    }
}

function mapStateToProps(state) {
    const towns = state.towns.townData;
    return { towns };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FreeSupplies);
