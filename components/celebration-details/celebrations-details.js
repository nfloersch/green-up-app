// @flow
import React from "react";
import { StyleSheet, ScrollView, View, SafeAreaView, TouchableHighlight } from "react-native";
import { Tile, Image, Subtitle, Text, Title } from "@shoutem/ui";
import { defaultStyles } from "../../styles/default-styles";
import moment from "moment";

const myStyles = {};
const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
type PropsType = {
    celebration: Object,
    closeModal: () => void
};

export const CelebrationDetails = ({ celebration, closeModal }: PropsType): React$Element<any> => n(
    <SafeAreaView style={ styles.container }>
        <View style={ [styles.buttonBarHeaderModal, { backgroundColor: "#EEE", marginTop: 10 }] }>
            <View style={ styles.buttonBar }>
                <View style={ styles.buttonBarButton }>
                    <TouchableHighlight
                        style={ styles.headerButton }
                        onPress={ closeModal }
                    >
                        <Text style={ styles.headerButtonText }>{ "Close" }</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
        <ScrollView style={ styles.scroll }>
            <Tile>
                <Image
                    styleName="large-banner"
                    source={ { uri: celebration.image } }
                />
                <View style={ { paddingTop: 10 } }>
                    <Title styleName="sm-gutter-horizontal">{ celebration.name }</Title>
                    <View style={ { margin: 10 } }>
                        <Subtitle>{ celebration.townName }</Subtitle>
                        <Text>{ celebration.start ? moment(celebration.start).format("MM DD YYYY HH:MM:A") : null }</Text>
                        <Text>{ celebration.end ? moment(celebration.end).format("MM DD YYYY HH:MM:A") : null }</Text>
                        <Text>{ celebration.description }</Text>
                    </View>
                </View>
            </Tile>
        </ScrollView>
    </SafeAreaView>
);


