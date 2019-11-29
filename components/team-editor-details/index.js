// @flow
import React, { useReducer } from "react";
import {
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    View
} from "react-native";
import { Screen } from "@shoutem/ui";
import { fixAndroidTime } from "../../libs/fix-android-time";
import MiniMap from "../../components/mini-map";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DateTimePicker from "react-native-modal-datetime-picker";
import { SegmentedControls } from "react-native-radio-buttons";
import * as actionCreators from "../../action-creators/team-action-creators";
import moment from "moment";
import { defaultStyles } from "../../styles/default-styles";
import Team from "../../models/team";
import TeamMember from "../../models/team-member";
import * as statuses from "../../constants/team-member-statuses";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import * as colors from "../../styles/constants";
import ButtonBar from "../../components/button-bar";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import * as constants from "../../styles/constants";
import TownSelector from "../../components/town-selector";
import * as R from "ramda";

const myStyles = {
    danger: {
        borderWidth: 1,
        borderColor: "#FAA",
        marginTop: 10,
        padding: 10
    },
    dangerText: {
        color: colors.colorTextError,
        fontSize: 18,
        textAlign: "center"
    },
    selected: {
        opacity: 0.5
    }
};

const combinedStyles = Object.assign({}, defaultStyles, myStyles);
const styles = StyleSheet.create(combinedStyles);
const dateRangeMessage = `${ moment(getCurrentGreenUpDay()).utc().format("dddd, MMM Do YYYY") } is the next Green Up Day, but teams may choose to work up to one week before or after.`;
const freshState = (selectedTeam: ?TeamType, initialMapLocation: ?CoordinatesType = null): Object => ({
    team: Team.create(selectedTeam),
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    datePickerVisible: false,
    query: "",
    town: "",
    locations: [],
    date: null,
    end: null,
    start: null,
    initialMapLocation
});

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
    actions: { deleteTeam: string => void, saveTeam: Object => void },
    currentUser: User,
    navigation: Object,
    otherCleanAreas: Array<any>,
    selectedTeam: TeamType,
    vermontTowns: Array<Object>
};

const TeamEditorDetails = ({ actions, navigation, otherCleanAreas, vermontTowns, selectedTeam }: PropsType): React$Element<any> => {

    const [state, dispatch] = useReducer(reducer, freshState(selectedTeam));

    const handleMapClick = (coordinates: Object) => {
        Keyboard.dismiss();
        dispatch({
            type: "SET_TEAM_STATE",
            data: {
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
        dispatch({ type: "RESET_STATE", data: freshState(selectedTeam) });
    };

    const saveTeam = () => {
        actions.saveTeam(state.team);
    };

    const deleteTeam = () => {
        Alert.alert(
            "DANGER!",
            "Are you really, really sure you want to permanently delete this team?",
            [
                {
                    text: "No", onPress: () => {
                    }, style: "cancel"
                },
                {
                    text: "Yes", onPress: () => {
                        navigation.goBack();
                        if (selectedTeam.id) {
                            actions.deleteTeam(selectedTeam.id);
                        }
                        // We should do something here?
                    }
                }
            ],
            { cancelable: true }
        );
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

    const handleDatePicked = (pickedDate: Date) => {
        const arr = pickedDate.toString().split(" ");
        const date = `${ arr[0] } ${ arr[1] } ${ arr[2] } ${ arr[3] }`;
        setTeamValue("date")(date);
        setState({ datePickerVisible: false })();
    };

    const handleStartDatePicked = (date: Date) => {
        let start = date.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
        if (Platform.OS === "android") {
            start = fixAndroidTime(start);
        }
        setTeamValue("start")(start);
        setState({ startDateTimePickerVisible: false })();
    };

    const handleEndDatePicked = (date: Date) => {
        let end = date.toLocaleTimeString("en-US", { hour12: true, hour: "2-digit", minute: "2-digit" });
        if (Platform.OS === "android") {
            end = fixAndroidTime(end);
        }
        setTeamValue("end")(end);
        setState({ endDateTimePickerVisible: false })();
    };

    const setSelectedOption = (option: Object) => {
        dispatch({ type: "SET_TEAM_STATE", data: { isPublic: option.value } });
    };

    const isPublicOptions = [
        {
            label: "Public",
            value: true
        }, {
            label: "Private",
            value: false
        }
    ];

    // DateTimePicker
    const dateIsSelected = state.team.date === null;
    const endIsSelected = state.team.end === null;
    const startIsSelected = state.team.start === null;
    const applyDateOffset = (date: Date, days: number): Date => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    };
    const eventDate = getCurrentGreenUpDay();
    const minDate = applyDateOffset(eventDate, -6);
    const maxDate = applyDateOffset(eventDate, 6);
    const headerButtons = [{ text: "Save", onClick: saveTeam }, { text: "Cancel", onClick: cancel }];

    const pinsConfig = state.team.locations
        .map(l => ({
            coordinates: l.coordinates,
            title: state.team.name,
            description: "Click here to remove pin",
            onCalloutPress: removeMarker,
            color: "green"
        }))
        .concat(otherCleanAreas.map(o => ({ ...o, color: "yellow" })));

    let nextTextInput;
    return (
        <Screen style={ { backgroundColor: constants.colorBackgroundDark } }>
            <ButtonBar buttonConfigs={ headerButtons }/>
            <ScrollView
                style={ [styles.scroll, {
                    borderTopWidth: 10,
                    borderTopColor: constants.colorBackgroundDark,
                    borderTopStyle: "solid"
                }] }
                automaticallyAdjustContentInsets={ false }
                scrollEventThrottle={ 200 }
                keyboardShouldPersistTaps={ "always" }
            >
                <View style={ styles.infoBlockContainer }>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ styles.labelDark }>{ "Team Name" }</Text>
                        <TextInput
                            keyBoardType={ "default" }
                            onChangeText={ setTeamValue("name") }
                            placeholder={ "Team Name" }
                            style={ styles.textInput }
                            value={ state.team.name }
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ [styles.labelDark, { fontSize: 16 }] }>
                            { state.team.isPublic ? "This team is open to anyone" : "Only invited members can join this team." }
                        </Text>
                        <SegmentedControls
                            options={ isPublicOptions }
                            onSelection={ setSelectedOption }
                            selectedOption={ state.team.isPublic }
                            selectedTint={ "#EFEFEF" }
                            style={ { borderRadius: 0, color: "red" } }
                            tint={ constants.colorButton }
                            extractText={ (option: Object): string => option.label }
                            testOptionEqual={ (selectedValue: string, option: Object): boolean => selectedValue === option.value }/>
                    </View>
                    <TownSelector
                        onSelect={ (town: Town) => {
                            nextTextInput.focus();
                            setTeamValue("townId")(town.id);
                        } }
                        value={ (vermontTowns.find((town: Town): boolean => town.id === state.team.townId) || {}).name || "" }
                        towns={ vermontTowns }/>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ styles.labelDark }>{ "Clean Up Site" }</Text>
                        <TextInput
                            keyBoardType={ "default" }
                            onChangeText={ setTeamValue("location") }
                            placeholder={ "Location" }
                            ref={ (input: any) => {
                                nextTextInput = input;
                            } }
                            style={ styles.textInput }
                            value={ state.team.location }
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ [styles.alertInfo, { textAlign: "left" }] }>
                            { dateRangeMessage }
                        </Text>
                        <Text style={ styles.labelDark }>{ "Date" }</Text>
                        <View>
                            <TouchableOpacity onPress={ setState({ datePickerVisible: true }) }>
                                <Text style={ [styles.textInput, dateIsSelected && styles.selected] }>
                                    { state.team.date || "Select a Date" }
                                </Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                mode="date"
                                date={ eventDate }
                                minimumDate={ minDate }
                                maximumDate={ maxDate }
                                isVisible={ state.datePickerVisible }
                                onConfirm={ handleDatePicked }
                                onCancel={ setState({ datePickerVisible: false }) }
                            />
                        </View>
                    </View>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ styles.labelDark }>Start Time</Text>
                        <View>
                            <TouchableOpacity onPress={ setState({ startDateTimePickerVisible: true }) }>
                                <Text style={ [styles.textInput, startIsSelected && styles.selected] }>
                                    { state.team.start || "Select a Time" }
                                </Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                mode="time"
                                isVisible={ state.startDateTimePickerVisible }
                                onConfirm={ handleStartDatePicked }
                                onCancel={ setState({ startDateTimePickerVisible: false }) }
                                is24Hour={ false }
                            />
                        </View>
                    </View>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ styles.labelDark }>End Time</Text>
                        <View>
                            <TouchableOpacity onPress={ setState({ endDateTimePickerVisible: true }) }>
                                <Text style={ [styles.textInput, endIsSelected && styles.selected] }>
                                    { state.team.end || "Select a Time" }
                                </Text>
                            </TouchableOpacity>
                            <DateTimePicker
                                mode="time"
                                isVisible={ state.endDateTimePickerVisible }
                                onConfirm={ handleEndDatePicked }
                                onCancel={ setState({ endDateTimePickerVisible: false }) }
                                is24Hour={ false }
                            />
                        </View>
                    </View>
                    <View style={ { marginTop: 10 } }>
                        <Text style={ styles.labelDark }>{ "Team Description" }</Text>
                        <TextInput
                            keyBoardType={ "default" }
                            multiline={ true }
                            numberOfLines={ 10 }
                            textAlignVertical="top"
                            onChangeText={ setTeamValue("description") }
                            placeholder={ "Tell us about your team" }
                            style={ styles.textArea }
                            value={ state.team.description }
                            underlineColorAndroid={ "transparent" }
                        />
                    </View>
                </View>
                <View style={ [styles.infoBlockContainer, { height: 450 }] }>
                    <Text style={ [styles.statusBar, { maxHeight: 63 }] }>
                        { "Place a marker where you want your team to work." }
                    </Text>
                    <MiniMap
                        pinsConfig={ pinsConfig }
                        onMapClick={ handleMapClick }
                    />
                    <TouchableOpacity style={ styles.button } onPress={ removeLastMarker }>
                        <Text style={ styles.buttonText }>{ "remove marker" }</Text>
                    </TouchableOpacity>
                </View>
                <View style={ { marginTop: 20 } }>
                    <TouchableHighlight
                        style={ styles.danger }
                        onPress={ deleteTeam }
                    >
                        <Text style={ styles.dangerText }>
                            { "Delete Team" }
                        </Text>
                    </TouchableHighlight>
                </View>
                {
                    Platform.OS === "ios"
                        ? (<View style={ defaultStyles.padForIOSKeyboardBig }/>)
                        : null
                }
            </ScrollView>
        </Screen>
    );
};

TeamEditorDetails.navigationOptions = {
    title: "Team Details",
    tabBarLabel: "Details"
};

type PinType<T> = ?(Array<T> | T);

const mapStateToProps = (state: Object): Object => {
    const selectedTeam = state.teams.selectedTeam;

    const profile = state.profile;

    const currentUser = User.create({ ...state.login.user, ...removeNulls(state.profile) });

    const owner = TeamMember.create({ ...currentUser, ...profile, memberStatus: statuses.OWNER });

    const mapToPinData = R.cond([
        [
            (locations: any): boolean => !locations,
            (): Array<any> => []
        ],
        [
            Array.isArray,
            (locations: PinType<any>, teamName: any): Array<Object> => (locations || [])
                .filter((l: PinType<any>): boolean => Boolean(l))
                .map((l: Object): mixed => mapToPinData(l, teamName))
        ],

        [
            R.T,
            (location: any, teamName: any): Object => ({
                key: "",
                coordinates: location.coordinates,
                title: `${ teamName || "Another Team" }`,
                description: "has claimed this area"
            })]
    ]);


    // $FlowFixMe
    const otherCleanAreas = R.compose(
        R.flatten,
        R.map((entry: [string, TeamType]): Array<Object> => mapToPinData(entry[1].locations, entry[1].name)),
        R.filter((entry: [string, TeamType]): boolean => (entry[0] !== selectedTeam.id)),
        Object.entries
    )(state.teams.teams);

    // $FlowFixMe
    const vermontTowns = R.compose(
        R.sort((a: TeamType, b: TeamType): number => ((a.name || "").toLowerCase() < (b.name || "").toLowerCase()) ? 1 : -1),
        R.filter((town: Town): boolean => Boolean(town.name)), // hedge against bad data.
        Object.values
    )(state.towns.townData);

    return { owner, currentUser, otherCleanAreas, vermontTowns, selectedTeam };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object => ({ actions: bindActionCreators(actionCreators, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(TeamEditorDetails);
