// @flow
import { useReducer, useMemo } from "react";
import {
    Alert,
    Keyboard,
    Platform,
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView, TouchableWithoutFeedback
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { fixAndroidTime } from "../../libs/fix-android-time";
import MiniMap from "../../components/mini-map";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker"
import * as actionCreators from "../../action-creators/team-action-creators";
import moment from "moment";
import { defaultStyles } from "../../styles/default-styles";
import Team from "../../models/team";
import TeamMember from "../../models/team-member";
import * as statuses from "../../constants/team-member-statuses";
import User from "../../models/user";
import { removeNulls } from "../../libs/remove-nulls";
import { TownLocation } from "../../models/town";
import ButtonBar from "../../components/button-bar";
import { getCurrentGreenUpDay } from "../../libs/green-up-day-calucators";
import * as constants from "../../styles/constants";
import * as R from "ramda";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { findTownIdByCoordinates } from "../../libs/geo-helpers";
import { LineDivider } from "@/components/divider";
import { localeDate, localeTime } from '@/libs/datetime';
import { PrimaryButton, SecondaryButton } from "@/components/button";
import colors from "@/constants/colors";
import { Text } from "@/components/text";
import { TextInput } from "@/components/inputs";

const myStyles = {
    selected: {
        opacity: 0.65
    },
    publicButton: {
        width: '50%',
        backgroundColor: colors.white
    },
    publicText: {
        fontSize: 12,
        color: '#555'
    },
    privateButton: {
        width: '50%',
        backgroundColor: colors.backgroundDark
    },
    privateText: {
        fontSize: 12,
        color: 'white',
        opacity: 0.5
    }
};

const styles = StyleSheet.create({ ...defaultStyles, ...myStyles });
const dateRangeMessage = `${moment(getCurrentGreenUpDay()).utc().format("dddd, MMM Do YYYY")} is the next Green Up Day, but teams may choose to work up to one week before or after.`;
const freshState = (owner: UserType, initialMapLocation: ?CoordinatesType = null): Object => ({
    team: Team.create({ owner, "date":getCurrentGreenUpDay(),"startdate":"9am",  "end": "5pm" }),
    startDateTimePickerVisible: false,
    endDateTimePickerVisible: false,
    datePickerVisible: false,
    query: "",
    townId: "",
    locations: [],
    date: getCurrentGreenUpDay(),
    initialMapLocation
});
const setTime = (date: Date, time: string): Date => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // $FlowFixMe
    const year = date.getYear() + 1900;
    return new Date(`${year}-${month}-${day}T${time}:00`).toLocaleTimeString("en-GB");
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
    actions: { createTeam: (TeamType, UserType) => void },
    currentUser: User,
    locations: Array<TownLocation>,
    otherCleanAreas: Array<any>,
    vermontTowns: Array<Object>,
    navigation: Object
};


const NewTeam = ({ actions, currentUser, otherCleanAreas, navigation }) => {
    const [state, dispatch] = useReducer(reducer, freshState(currentUser));



    const handleMapClick = (coordinates: Object) => {
        Keyboard.dismiss();
        const town = findTownIdByCoordinates(coordinates);
        dispatch({
            type: "SET_TEAM_STATE",
            data: {
                townId: town,
                locations: state.team.locations.concat({
                    title: "Clean Area",
                    description: state.team.name,
                    townId: town,
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
        dispatch({ type: "RESET_STATE", data: freshState(currentUser) });
    };

    const createTeam = () => {
        const team = Team.create({ ...state.team });
        console.log("Team: ", team);
        if (!team.name) {
            Alert.alert("Please give your team a name.");
        } else {
            actions.createTeam(team, currentUser);
            navigation.goBack();
        }
    };

    const setTeamValue = (key: string): (any=> void) => (value: any) => {
        dispatch({
            type: "SET_TEAM_STATE",
            data: { [key]: value }
        });
    };

const setState = (data: Object): (() => void) => () => {
    dispatch({
        type: "SET_STATE",
        data
    });
};



const dateIsSelected = state.team.date === null;
const endIsSelected = state.team.end === null;
const startIsSelected = state.team.startdate === null;
const applyDateOffset = (date: Date, days: number): Date => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
};
const eventDate = (getCurrentGreenUpDay()).toLocaleDateString("en-GB");
const minDate = applyDateOffset(eventDate, -6);
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
    <SafeAreaView style={styles.container}>
        <ButtonBar buttonConfigs={headerButtons} />

        <KeyboardAvoidingView
            keyboardVerticalOffset={100}
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
        >
            <View style={{ flex: 1, justifyContent: "flex-end" }}>

                <ScrollView
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}
                    style={{ paddingLeft: 20, paddingRight: 20 }}
                >


                    <View style={styles.formControl}>
                        <Text style={styles.label}>{"Team Name"}</Text>
                        <TextInput
                            keyBoardType={"default"}
                            onChangeText={setTeamValue("name")}
                            placeholder={"Team Name"}
                            value={state.team.name}
                            underlineColorAndroid={"transparent"}
                        />
                    </View>

                    <View style={styles.formControl}>
                        <Text style={styles.label}>
                            {state.team.isPublic ? "Anyone can join your team" : "You control who joins your team"}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <PrimaryButton
                                style={{ ...(state.team.isPublic ? styles.publicButton : styles.privateButton) }}
                                onPress={() => setTeamValue("isPublic")(true)}>
                                <MaterialCommunityIcons
                                    name="earth"
                                    size={25}
                                    style={{ marginRight: 10 }}
                                    color={!state.team.isPublic ? "#555" : "black"}
                                />
                                <Text style={{ ...(state.team.isPublic ? styles.publicText : styles.privateText) }}>PUBLIC</Text>
                            </PrimaryButton>
                            <PrimaryButton
                                style={{ ...(state.team.isPublic ? styles.privateButton : styles.publicButton) }}
                                onPress={() => setTeamValue("isPublic")(false)}>
                                <MaterialCommunityIcons
                                    name="earth-off"
                                    size={25}
                                    style={{ marginRight: 10 }}
                                    color={state.team.isPublic ? "#555" : "black"}
                                />
                                <Text style={{ ...(state.team.isPublic ? styles.privateText : styles.publicText) }}>PRIVATE</Text>
                            </PrimaryButton>
                        </View>
                    </View>
                    <LineDivider style={{ marginTop: 20, marginBottom: 20 }} />
                    <View style={styles.formControl}>
                        <Text style={styles.label}>{"Clean Up Site"}</Text>
                        <TextInput
                            keyBoardType={"default"}
                            onChangeText={setTeamValue("location")}
                            placeholder={"The park, school, or road name"}
                            value={state.team.location}
                            style={{ backgroundColor: "white", padding: 20 }}
                            underlineColorAndroid={"transparent"}
                        />
                    </View>
                    <View style={styles.formControl}>
                        <Text style={{ ...styles.label, maxHeight: 63 }}>
                            {"Mark your spot(s)"}
                        </Text>
                        <MiniMap
                            pinsConfig={pinsConfig}
                            onMapClick={handleMapClick}
                        />
                        <SecondaryButton
                            onPress={removeLastMarker}
                        >
                            <Text style={{ color: 'white' }}>{"REMOVE MARKER"}</Text>
                        </SecondaryButton>
                    </View>
                    <LineDivider style={{ marginTop: 20, marginBottom: 20 }} />
                    <View style={styles.formControl}>
                        <Text style={styles.alertInfo}>
                            {dateRangeMessage}
                        </Text>
                    </View>
                    <View style={styles.formControl}>

                        <View>
                            <Text style={ styles.label }>{ "Which day will your team be cleaning?" }</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    keyBoardType={ "default" }
                                    onChangeText={ setTeamValue("date")}
                                    placeholder={ "Date for your Green Up event?" }
                                    placeholderTextColor={colors.placeholderText}
                                    value={ state.team.date }
                                    underlineColorAndroid={ "transparent" }
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.formControl}>

                        <View>
                            <Text style={ styles.label }>{ "What time will your team start Greening Up?" }</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    keyBoardType={ "default" }
                                    onChangeText={ setTeamValue("startdate") }
                                    placeholder={ "Start Time for your Green Up event" }
                                    placeholderTextColor={colors.placeholderText}
                                    value={ state.team.startdate }
                                    underlineColorAndroid={ "transparent" }
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.formControl}>

                        <View>
                            <Text style={ styles.label }>{ "What time will your team stop Greening Up?" }</Text>
                            <View>
                                <TextInput
                                    style={styles.textInput}
                                    keyBoardType={ "default" }
                                    onChangeText={ setTeamValue("end") }
                                    placeholder={ "End Time for your Green Up event" }
                                    placeholderTextColor={colors.placeholderText}
                                    value={ state.team.end }
                                    underlineColorAndroid={ "transparent" }
                                />
                            </View>
                        </View>
                    </View>
                    <LineDivider style={{ marginTop: 20, marginBottom: 20 }} />
                    <View style={styles.formControl}>
                        <Text style={styles.label}>{"Team Information"}</Text>
                        <TextInput
                            keyBoardType={"default"}
                            multiline={true}
                            numberOfLines={10}
                            textAlignVertical="top"
                            onChangeText={setTeamValue("description")}
                            placeholder={"Add important information here"}
                            style={styles.textArea}
                            value={state.team.description}
                            underlineColorAndroid={"transparent"}
                        />
                    </View>


                </ScrollView>
                <View style={{ flex: 1 }} />
            </View>
        </KeyboardAvoidingView>

    </SafeAreaView>
);
}

NewTeam.navigationOptions = {
    title: "Start a Team",
    headerStyle: {
        backgroundColor: constants.colorBackgroundDark
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    },
    headerBackTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontWeight: "bold",
        fontSize: 20,
        color: constants.colorHeaderText
    }
};

type PinType<T> = ?(Array<T> | T);

const mapStateToProps = (state: Object): Object => {
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
                title: `${teamName || "Another Team"}`,
                description: "has claimed this area"
            })]
    ]);

    // $FlowFixMe
    const otherCleanAreas = R.compose(
        R.flatten,
        R.map(
            (team: TeamType): Array<Object> => mapToPinData(team.locations, team.name)
        ),
        Object.values
    )(state.teams.teams);

    // // $FlowFixMe
    // const vermontTowns = R.compose(
    //     R.sort((a: TeamType, b: TeamType): number => ((a.name || "").toLowerCase() < (b.name || "").toLowerCase()) ? 1 : -1),
    //     R.filter((town: Town): boolean => Boolean(town.name)), // hedge against bad data.
    //     Object.values
    // )(state.towns.townData);

    return { owner, currentUser, otherCleanAreas };
};

const mapDispatchToProps = (dispatch: Dispatch<Object>): Object =>
    ({ actions: bindActionCreators(actionCreators, dispatch) });

// $FlowFixMe
export default connect(mapStateToProps, mapDispatchToProps)(NewTeam);
