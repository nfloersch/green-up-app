//  @flow
import React, { useReducer } from "react";
import {
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    View,
    Text,
    Pressable,
    TextInput
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fixAndroidTime } from "@/libs/fix-android-time";
import MiniMap from "@/components/mini-map";
//import DateTimePicker from "react-native-modal-datetime-picker";
// import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePicker from "@react-native-community/datetimepicker"
import moment from "moment";
import { defaultStyles } from "@/styles/default-styles";
import Team from "@/models/team";
import User from "@/models/user";
import ButtonBar from "@/components/button-bar";
import { getCurrentGreenUpDay } from "@/libs/green-up-day-calucators";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { findTownIdByCoordinates } from "@/libs/geo-helpers";
import { LineDivider } from "@/components/divider";
import colors from "@/constants/colors";
import { PrimaryButton } from "@/components/button";
const myStyles = {
    selected: {
        opacity: 1
    },
    switchButton: {
        paddingTop: 15,
        paddingBottom: 15,
        width: '50%',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchButtonActive: {
        backgroundColor: colors.backgroundLight
    },
    switchButtonInactive: {
        backgroundColor: colors.backgroundDark
    }

};

const styles = StyleSheet.create({...defaultStyles, ...myStyles});
const dateRangeMessage = `${ moment(getCurrentGreenUpDay()).utc().format("dddd, MMM Do YYYY") } is the next Green Up Day, but teams may choose to work up to one week before or after.`;
const freshState = (owner: UserType, team: ?TeamType, initialMapLocation: ?CoordinatesType = null): Object => ({
    team: Team.create(team || { owner }),
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    datePickerVisible: false,
    query: "",
    town: "",
    locations: [],
    date: null,
    end: null,
    startdate: null,
    initialMapLocation
});
const setTime = (date: Date, time: string): Date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // $FlowFixMe
    const year = date.getYear() + 1900;
    return new Date(`${ year }-${ month }-${ day }T${ time }:00`);
    //return new Date(year, month, day, );
};

function reducer(state: Object, action: Object): Object {
    switch (action.type) {
        case "SET_STATE":
            return { ...state, ...action.data };
        case "SET_TEAM_STATE":
            return { ...state, team: { ...state.team, ...action.data } };
        case "RESET_STATE":
            return action.data;
        default:
            throw new Error("Invalid action type");
    }
}

type PropsType = {
    currentUser: User,
    otherCleanAreas: Array<any>,
    team: TeamType,
    onSave: TeamType => void,
    children: any
};

export const TeamDetailsForm = ({ currentUser, children, otherCleanAreas, team, onSave }: PropsType): React$Element<any> => {

    const [state, dispatch] = useReducer(reducer, freshState(currentUser, team));

    const handleMapClick = (coordinates: Object) => {
        Keyboard.dismiss();
        const town = findTownIdByCoordinates(coordinates);
        dispatch({
            type: "SET_TEAM_STATE",
            data: {
                town,
                locations: state.team.locations.concat({
                    title: "Clean Area",
                    description: "tap to remove",
                    coordinates
                })
            }
        });
    };

    const removeLastMarker = () => {
        const locations = state.team.locations.slice(0, state.team.locations.length - 1);
        dispatch({ type: "SET_TEAM_STATE", data: { locations } });
    };

    const removeMarker = (index: number) => {
        const myLocations = state.team.locations || [];
        if (index < myLocations.length) {
            const locations = myLocations.slice(0, index).concat(myLocations.slice(index + 1));
            dispatch({ type: "SET_TEAM_STATE", data: { locations } });
        }
    };

    const cancel = () => {
        dispatch({ type: "RESET_STATE", data: freshState(currentUser, team) });
    };

    const createTeam = () => {
        const myTeam = Team.create({ ...state.team });
        if (!myTeam.name) {
            Alert.alert("Please give your team a name.");
        } else {
            onSave(myTeam);
        }
    };

    const setTeamValue = (key: string): (any=>void) => (value: any) => {
        dispatch({
            type: "SET_TEAM_STATE",
            data: { [key]: value }
        });
    };

    const setState = (data: Object): (()=>void) => () => {
        dispatch({
            type: "SET_STATE",
            data
        });
    };

    const handleDatePicked = (event: Event, pickedDate: Date) => {
        const arr = pickedDate.toString().split(" ");
        const date = `${ arr[0] } ${ arr[1] } ${ arr[2] } ${ arr[3] }`;
        setTeamValue("date")(date);
        setState({ datePickerVisible: false })();
        console.log("date",pickedDate);
    };

    const handleStartDatePicked = (event: Event, date: Date) => {
        if (event.type == "set") {
            console.log("Time Set");
            let newstart = date.toLocaleTimeString("en-GB"); // date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
            let start = null;
            console.log("Platform", Platform.OS);
            if (Platform.OS === "android") {
                console.log("new start", newstart);
                start = newstart.split(":")[0] + ":" + newstart.split(":")[1]
                console.log("fixed new start", start);
            }
            else {
                start = newstart;
            }
            console.log("cleaned new start: " + start);
            setTeamValue("startdate")(start);
            setState({ startDateTimePickerVisible: false })();
        }
        if (event.type == "dismissed") {
            console.log("Time Dismissed");
        }
    };

    const handleEndDatePicked = (event: Event, date: Date) => {
        if (event.type == "set") {
            console.log("Time Set");
            let newend = date.toLocaleTimeString("en-GB"); // date.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" });
            let end = null;
            console.log("Platform", Platform.OS);
            if (Platform.OS === "android") {
                console.log("new end", newend);
                end = newend.split(":")[0] + ":" + newend.split(":")[1]
                console.log("fixed new end", end);
            }
            else {
                end = newend;
            }
            console.log("cleaned new end: " + end);
            setTeamValue("end")(end);
            setState({ endDateTimePickerVisible: false })();
        }
        if (event.type == "dismissed") {
            console.log("Time Dismissed");
        }
    };

    // DateTimePicker

    const dateIsSelected = state.team.date === null;
    const endIsSelected = state.team.end === null;
    const startIsSelected = state.team.startdate === null;
    const applyDateOffset = (date: Date, days: number): Date => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    const eventDate = getCurrentGreenUpDay();
    const defaultStartTime = setTime( eventDate, (state.team.startdate || "09:00"));
    const defaultEndTime = setTime( eventDate, (state.team.end || "17:00"));
    const minDate = new Date(); //applyDateOffset(eventDate, -6);
    const maxDate = applyDateOffset(minDate, 364);
    const headerButtons = [{ text: "Save", onClick: createTeam }, { text: "Clear", onClick: cancel }];

    const pinsConfig = state.team.locations
        .map(l => ({
            coordinates: l.coordinates,
            title: state.team.name,
            description: "Click here to remove pin",
            onCalloutPress: removeMarker,
            color: "green"
        }))
        .concat(otherCleanAreas.map(o => ({ ...o, color: "yellow" })));

    return (

        <SafeAreaView style={ styles.container }>
            <ButtonBar buttonConfigs={ headerButtons }/>

            <KeyboardAvoidingView
                keyboardVerticalOffset={ 100 }
                style={ { flex: 1 } }
                behavior={ Platform.OS === "ios" ? "padding" : null }
            >
                <View style={ { flex: 1, justifyContent: "flex-end" } }>
                    <ScrollView
                        style={ styles.scroll }
                        // automaticallyAdjustContentInsets={ false }
                        scrollEventThrottle={ 200 }
                    >
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>{ "Team Name" }</Text>
                            <TextInput
                                style={styles.textInput}
                                keyBoardType={ "default" }
                                onChangeText={ setTeamValue("name") }
                                placeholder={ "Team Name" }
                                value={ state.team.name }
                                underlineColorAndroid={ "transparent" }
                            />
                        </View>

                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>
                                { state.team.isPublic ? "Anyone can join your team" : "You control who joins your team" }
                            </Text>
                            <View style={{flex: 1, flexDirection: 'row'}} >
                                <Pressable
                                    style={ [styles.switchButton, state.team.isPublic ? styles.switchButtonActive : styles.switchButtonInactive] }
                                    onPress={ () => setTeamValue("isPublic")(true) }>
                                    <MaterialCommunityIcons
                                        name="earth"
                                        size={ 25 }
                                        style={ { marginRight: 10 } }
                                        color={ !state.team.isPublic ? "#555" : "black" }
                                    />
                                    <Text
                                        style={state.team.isPublic ? {color:"black"} : {color: "white"}}>
                                        PUBLIC
                                    </Text>
                                </Pressable>
                                <Pressable
                                    style={ [styles.switchButton, state.team.isPublic ? styles.switchButtonInactive : styles.switchButtonActive] }
                                    onPress={ () => setTeamValue("isPublic")(false) }>
                                    <MaterialCommunityIcons
                                        name="earth-off"
                                        size={ 25 }
                                        style={ { marginRight: 10 } }
                                        color={ state.team.isPublic ? "#555" : "black" }
                                    />
                                    <Text
                                        style={state.team.isPublic ? {color:"white"} : {color: "black"}}>
                                        PRIVATE
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <LineDivider style={ { marginTop: 20, marginBottom: 20 } }/>
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>{ "Clean Up Site" }</Text>
                            <TextInput
                                style={styles.textInput}
                                keyBoardType={ "default" }
                                onChangeText={ setTeamValue("location") }
                                placeholder={ "The park, school, or road name" }
                                placeholderTextColor={colors.placeholderText}
                                value={ state.team.location }
                                underlineColorAndroid={ "transparent" }
                            />
                        </View>
                        <View style={ styles.formControl }>
                            <Text style={ { ...styles.label, maxHeight: 63 } }>
                                { "Mark your spot(s)" }
                            </Text>
                            <MiniMap
                                pinsConfig={ pinsConfig }
                                onMapClick={ handleMapClick }
                            />
                            <PrimaryButton
                                onPress={ removeLastMarker }
                            >
                                <Text>{ "REMOVE MARKER" }</Text>
                            </PrimaryButton>
                        </View>
                        <LineDivider style={ { marginTop: 20, marginBottom: 20 } }/>
                        <View style={ styles.formControl }>
                            <Text style={ styles.alertInfo }>
                                { dateRangeMessage }
                            </Text>
                        </View>
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>{ "When will your team be cleaning?" }</Text>
                            <View>
                                <Text style={ styles.label }>{ "Which day will your team be cleaning?" }</Text>
                                <View>
                                    <TextInput
                                        style={styles.textInput}
                                        keyBoardType={ "default" }
                                        onChangeText={ setTeamValue("date") }
                                        placeholder={ "Date for your pickup event" }
                                        placeholderTextColor={colors.placeholderText}
                                        value={ state.team.date }
                                        underlineColorAndroid={ "transparent" }
                                    />
                                </View>
                                {/*<TouchableOpacity onPress={ setState({ datePickerVisible: true }) }>*/}
                                {/*    <Text*/}
                                {/*        style={ { ...styles.textInput, ...(dateIsSelected ? styles.selected : {}) } }>*/}
                                {/*        { state.team.date || "Which day will your team be cleaning?" }*/}
                                {/*    </Text>*/}
                                {/*</TouchableOpacity>*/}
                                {/*{ state.datePickerVisible &&*/}
                                {/*    <DateTimePicker*/}
                                {/*    mode="date"*/}
                                {/*    value={ eventDate }*/}
                                {/*    minimumDate={ minDate }*/}
                                {/*    maximumDate={ maxDate }*/}
                                {/*    onChange={ handleDatePicked }*/}
                                {/*    onCancel={ setState({ datePickerVisible: false }) }*/}
                                {/*    titleIOS={ "Which day is your team cleaning?" }*/}
                                {/*    titleStyle={ styles.datePickerTitleStyle }*/}
                                {/*/>*/}
                                {/*}*/}
                            </View>
                        </View>
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>{ "What time will your team start?" }</Text>
                            <View>

                                    <TextInput
                                        style={styles.textInput}
                                        keyBoardType={ "default" }
                                        onChangeText={ setTeamValue("startdate") }
                                        placeholder={ "Start Time for your pickup event" }
                                        placeholderTextColor={colors.placeholderText}
                                        value={ state.team.startdate }
                                        underlineColorAndroid={ "transparent" }
                                    />
                            </View>
                        </View>
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>{ "What time will your team end?" }</Text>
                            <View>

                                    <TextInput
                                        style={styles.textInput}
                                        keyBoardType={ "default" }
                                        onChangeText={ setTeamValue("end") }
                                        placeholder={ "End Time for your pickup event" }
                                        placeholderTextColor={colors.placeholderText}
                                        value={ state.team.end }
                                        underlineColorAndroid={ "transparent" }
                                    />
                            </View>
                        </View>

                        <LineDivider style={ { marginTop: 20, marginBottom: 20 } }/>
                        <View style={ styles.formControl }>
                            <Text style={ styles.label }>{ "Team Information" }</Text>
                            <TextInput
                                style={ styles.textArea }
                                keyBoardType={ "default" }
                                multiline={ true }
                                numberOfLines={10}
                                textAlignVertical="top"
                                onChangeText={ setTeamValue("description") }
                                placeholder={ "Add important information here" }
                                placeholderTextColor={colors.placeholderText}
                                value={ state.team.description }
                                underlineColorAndroid={ "transparent" }
                            />
                        </View>
                        { children }
                    </ScrollView>

                    <View style={ { flex: 1 } }/>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};