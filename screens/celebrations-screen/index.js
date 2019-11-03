// @flow
import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    Platform,
    SafeAreaView
} from "react-native";
import { connect } from "react-redux";
import { defaultStyles } from "../../styles/default-styles";
// import CelebrationLocation from "../../components/celebration-location";
import * as R from "ramda";
import WatchGeoLocation from "../../components/watch-geo-location";
import { Ionicons } from "@expo/vector-icons";
import { searchArray } from "../../libs/search-score";
import { ListView, GridRow, ImageBackground, Tile, Subtitle, Title, Divider, Card, Image, Caption } from "@shoutem/ui";
import * as constants from "../../styles/constants";

const styles = StyleSheet.create(defaultStyles);
const iconStyle = {
    height: 40,
    width: 40,
    padding: 2,
    color: "white",
    textAlign: "center"
};
const searchableFields = ["name", "townName", "address", "townId"];
type PropsType = {
    celebrationEvents: Array<Object>,
    userLocation: Object
};

const Celebrations = ({ celebrationEvents, userLocation }: PropsType): React$Element<any> => {

    const [searchResults, setSearchResults] = useState(celebrationEvents);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const spotsFound = searchArray(searchableFields, celebrationEvents, searchTerm);
        setSearchResults(spotsFound);
    }, [searchTerm]);


    const renderRow = (rowData, index) => {
        // rowData contains grouped data for one row,
        // so we need to remap it into cells and pass to GridRow
        if (rowData.length === 1) {
            return (
                <TouchableOpacity key={ index }>
                    <ImageBackground
                        styleName="large"
                        source={ { uri: rowData[0].image } }
                    >
                        <Tile>
                            <Title styleName="md-gutter-bottom">{ rowData[0].townName }</Title>
                            <Subtitle styleName="sm-gutter-horizontal">{ rowData[0].name }</Subtitle>
                        </Tile>
                    </ImageBackground>
                    <Divider styleName="line"/>
                </TouchableOpacity>
            );
        }

        const cellViews = rowData.map((item, id) => (
            <TouchableOpacity key={ id } styleName="flexible">
                <Card styleName="flexible">
                    <Image
                        styleName="medium-wide"
                        source={ { uri: item.image } }
                    />
                    <View styleName="content">
                        <Subtitle numberOfLines={ 3 }>{ item.townName }</Subtitle>
                        <View styleName="horizontal">
                            <Caption styleName="collapsible" numberOfLines={ 2 }>{ item.name }</Caption>
                        </View>
                    </View>
                </Card>
            </TouchableOpacity>
        ));

        return (
            <GridRow columns={ 2 }>
                { cellViews }
            </GridRow>
        );
    };

    const eventData = searchTerm ? searchResults : celebrationEvents;
    let isFirstArticle = true;
    const groupedData = GridRow.groupByRows(eventData, 2, () => {
        if (isFirstArticle) {
            isFirstArticle = false;
            return 2;
        }
        return 1;
    });

    return (
        <SafeAreaView style={ styles.container }>
            <WatchGeoLocation/>
            <View style={ { margin: 10, padding: 0, marginBottom: 2, height: 40 } }>
                <View style={ { flex: 1, flexDirection: "row", justifyContent: "flexStart" } }>
                    <View style={ { flex: 1, flexDirection: "column" } }>
                        <TextInput
                            keyBoardType={ "default" }
                            onChangeText={ setSearchTerm }
                            placeholder={ "Search" }
                            style={ [styles.textInput, { alignSelf: "stretch" }] }
                            value={ searchTerm }
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                    <TouchableHighlight
                        onPress={ () => {
                            setSearchTerm("");
                        } }
                        style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
                        <Ionicons
                            name={ Platform.OS === "ios" ? "ios-close-circle-outline" : "md-close-circle-outline" }
                            size={ 36 }
                            style={ iconStyle }/>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={ () => {
                            setSearchTerm(userLocation.townId || "");
                        } }
                        style={ { height: 40, width: 40, padding: 1, marginLeft: 2 } }>
                        <Ionicons
                            name={ Platform.OS === "ios" ? "md-locate" : "md-locate" }
                            size={ 36 }
                            style={ iconStyle }/>
                    </TouchableHighlight>
                </View>
            </View>
            <ListView
                style={ { backgroundColor: constants.colorBackgroundDark } }
                data={ groupedData }
                renderRow={ renderRow }
            />
        </SafeAreaView>
    );
};

Celebrations.navigationOptions = {
    title: "Celebrate Green Up"
};

const mapStateToProps = (state: Object): Object => {

    const flatReduce = ([key, town]) => (town.celebrations || [])
        .map((celebration): Object => ({
            ...celebration,
            townId: key,
            townName: town.name
        }));

    const celebrationEvents = R.compose(
        R.flatten,
        R.map((entry): Array<Object> => flatReduce(entry)),
        Object.entries
    )(state.towns.townData);
    return (
        {
            celebrationEvents,
            userLocation: state.userLocation
        });
};

export default connect(mapStateToProps)(Celebrations);
