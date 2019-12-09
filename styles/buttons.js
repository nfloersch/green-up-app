import * as constants from "./constants";

export const buttons = {
    button: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: constants.colorButton,
        backgroundColor: constants.colorButton,
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2
    },
    buttonText: {
        fontFamily: "Rubik-Regular"
    },

    altButton: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#DDD",
        backgroundColor: "#EEE",
        padding: 10,
        marginTop: 10,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.6,
        shadowRadius: 2
    },
    altButtonText: {
        color: "#1E1E1E",
        fontSize: 18,
        textAlign: "center"
    },
    buttonBar: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    buttonBarButton: {
        flexGrow: 1,
        textAlign: "center"
    },
    buttonBarHeader: {
        width: "100%",
        height: 60,
        backgroundColor: constants.colorBackgroundHeader,
        borderBottomWidth: 1,
        borderColor: "black"
    },
    buttonBarHeaderModal: {
        width: "100%",
        height: 60,
        backgroundColor: constants.colorBackgroundHeader,
        borderBottomWidth: 1,
        borderColor: "black",
        paddingTop: 0
    },
    buttonRow: {
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    goToButton: {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#AAA",
        height: 30,
        margin: 5
    },
    goButtonText: {
        fontSize: 18,
        color: "#007AFF",
        textAlign: "center",
        height: 30
    },
    headerButton: {
        height: 60,
        paddingTop: 20
    },
    headerButtonText: {
        fontSize: 18,
        color: "#007AFF",
        textAlign: "center"
    },
    link: {
        width: "100%",
        margin: 5,
        marginTop: 1,
        padding: 5
    },
    linkText: {
        fontSize: 16,
        color: "white",
        textAlign: "center"
    },
    searchResultsTitle: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },
    searchResult: {
        marginBottom: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#CCC",
        padding: 10,
        backgroundColor: "#EEE",
        shadowColor: "#FFF",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 0
    },
    singleButtonHeader: {
        width: "100%",
        height: 60,
        backgroundColor: constants.colorBackgroundHeader,
        borderBottomWidth: 1,
        borderColor: "black"
    },
    singleButtonHeaderHighlight: {
        height: 60,
        width: "100%"
    }
};