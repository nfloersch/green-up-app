const alertFontSize = 12;

export const defaultStyles = {
    alertInfo: {
        fontSize: alertFontSize,
        color: '#004085',
        backgroundColor: '#cce5ff',
        borderColor: '#b8daff',
        padding: 3,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center'
    },
    alertSuccess: {
        fontSize: alertFontSize,
        color: '#155724',
        backgroundColor: '#d4edda',
        borderColor: '#c3e6cb',
        padding: 3,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden',
        textAlign: 'center'
    },
    alertDanger: {
        fontSize: alertFontSize,
        color: '#721c24',
        backgroundColor: '#f8d7da',
        borderColor: '#f5c6cb',
        padding: 3,
        marginBottom: 5,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 20,
        overflow: 'hidden',
        textAlign: 'center'
    },
    button: {},
    buttonBar: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonBarButton: {
        width: '48%'
    },
    buttonBarHeader: {width: '100%', height: 60},
    buttonRow: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        flex: 1,
        alignContent: 'space-around',
        backgroundColor: 'white',
        borderColor: 'white',
        borderLeftWidth: 20,
        borderRightWidth: 20,
        borderTopWidth: 10
    },
    data: {
        fontWeight: 'bold'
    },
    fieldset: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        padding: 5
    },
    frame: {
        height: '100%',
        width: '100%'
    },
    goToButton: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#AAA',
        height: 30,
        margin: 5
    },
    goButtonText:{
        fontSize: 18,
        color: '#007AFF',
        textAlign: 'center',
        height: 30
    },
    headerButton: {
        height: 60,
        fontSize: 18,
        color: '#007AFF',
        paddingTop: 20,
        textAlign: 'center'
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'darkseagreen',
        color: '#fff',
        textShadowColor: '#000',
        textShadowRadius: 2,
        textShadowOffset: {width: 2, height: 2}
    },
    label: {
        marginTop: 5
    },
    largeText: {
        marginTop: 5,
        fontSize: 20
    },
    padForIOSKeyboard: {height: 80},
    padForIOSKeyboardBig: {height: 150},
    profileHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: 'darkseagreen'
    },
    profileName: {
        paddingLeft: 10,
        paddingTop: 12.5,
        fontSize: 20
    },
    scroll: {
        marginBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopColor: '#AAA',
        borderTopWidth: 1,
        backgroundColor: 'white'
    },
    searchResultsTitle: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    },
    searchResult: {
        marginTop: 2,
        borderWidth: 1,
        borderColor: '#000',
        padding: 5,
        backgroundColor: 'darkseagreen'
    },
    singleButtonHeader: {width: '100%', height: 60},
    singleButtonHeaderHighlight: {
        height: 60,
        width: '100%'
    },
    suggestion: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderColor: '#ABABAB',
        borderBottomWidth: 1
    },
    textArea: {
        borderColor: '#000',
        borderWidth: 1,
        padding: 5,
        height: 250,
        justifyContent: 'flex-start'
    },
    textInput: {
        borderColor: '#000',
        borderWidth: 1,
        height: 40,
        padding: 5,
        textAlign: 'left',
        lineHeight: 25
    }
};
