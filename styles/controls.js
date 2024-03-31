import colors from '@/constants/colors';

export const controls = {
    textArea: {
        borderColor: "#333",
        borderWidth: 1,
        padding: 5,
        height: 150,
        backgroundColor: colors.white,
    },
    textInput: {
        fontFamily: "Rubik-Regular",
        backgroundColor: colors.white,
        color: colors.inputText,
        textAlign: "left",
        height: 55,
        fontSize: 15,
        fontStyle: "normal",
        fontWeight: "normal",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 18,
        paddingBottom: 18,
    },
    picker: { backgroundColor: "rgba(255,255,255, 100)", marginTop: 5, padding: 0 },
    modalFrame: {},
    datePickerTitleStyle: {
        fontFamily: "Rubik-Regular",
        fontSize: 20,
        color: "#000"
    }
};
