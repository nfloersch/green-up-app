// const backgroundLight = 'white';
import * as constants from './constants';

export const boxes = {
    container: {
        flex: 1,
        justifyContent: 'flex-start'
    },
    fieldset: {
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        padding: 5
    },
    frame: {
        backgroundColor: constants.backgroundDark,
        height: '100%',
        width: '100%'
    },
    block: {paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: 'rgba(0,0,0,0.5)', width: '100%'},
    infoBlock: {
        marginBottom: 8, backgroundColor: '#EEE', padding: 10, borderWidth: 1, borderColor: '#FFF', shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.6,
        shadowRadius: 2
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
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: '#888',
        borderTopColor: '#FFF',
        height: 70,
        backgroundColor: '#EEE',
        alignItems: 'stretch',
        padding: 10
    },
    scroll: {
        marginBottom: 10,
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 10,
        backgroundColor: constants.backgroundDark
    },
    searchHeader: {
        backgroundColor: constants.headerBackgroundColor,
        paddingTop: 10, paddingBottom: 9, paddingLeft: 12, paddingRight: 12,
        borderBottomWidth: 1,
        borderColor: 'black'
    },
    statusBar: {
        height: 30,
        width: '100%',
        marginBottom: 10,
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'rgba(255,255,255,0.6)'
    },
    suggestion: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderColor: '#ABABAB',
        borderBottomWidth: 1
    }
};