import { RFValue } from "react-native-responsive-fontsize";
import {Dimensions} from "react-native";

export let win = Dimensions.get('window');
export let pinkColor = "#DF2172";
export let blueColor = "#0052A1";
export let greyColor = "#A9A9A9";
export let darkGreyColor = "#5E5E5E";
export let backgroundColor = "white";
export let titleFontSize = RFValue(30);
export let regularFontSize = RFValue(20);
export let title = {
    fontSize: titleFontSize,
    fontWeight: 'bold',
    textAlign: 'center'
};
export let borderRadius = 20;
export let shadow = {
    shadowColor: darkGreyColor,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 1
};

export default {
    win: win,
    container: {
        alignItems: 'center',
        flex: 1
    },
    rowContainer: {
        flexDirection: 'row'
    },
    background: {
        color: backgroundColor
    },
    shadow: shadow,
    pinkColor: pinkColor,
    blueColor: blueColor,
    greyColor: greyColor,
    darkGreyColor: darkGreyColor,
    titleFontSize: titleFontSize,
    regularFontSize: regularFontSize,
    title: title,
    titleBlue: {
        color: blueColor,
        ...title
    },
    titlePink: {
        ...title,
        color: pinkColor,
    },
    titleBlack: {
        ...title,
        color: 'black'
    },
    titleGrey: {
        ...title,
        color: greyColor
    },
    titleWhite: {
        ...title,
        color: 'white',
    },
    paragraphText: {
        color: greyColor,
        fontSize: regularFontSize,
        fontWeight: 'bold'
    },
    underlayColor: 'grey',
    button: {
        TouchableHighlight: {
            ...shadow,
            margin: win.height * 0.01,
            alignItems: 'center',
            backgroundColor: pinkColor,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 30,
            paddingRight: 30,
            borderRadius: borderRadius,
        },
        text: {
            color: 'white',
            fontSize: regularFontSize,
            fontWeight: 'normal'
        }
    },
    TextInput: {
        View: {
            ...shadow,
            height: 60,
            width: win.width * 0.8,
            margin: 9,
            borderColor: 'white',
            borderWidth: 0.5,
            borderRadius: borderRadius,
            justifyContent: 'center',
            backgroundColor: 'white'

        },
        TextInput: {
            fontSize: regularFontSize,
            textAlign: 'center',
        }
    },
    TextInputMask: {
        ...shadow,
            height: 60,
            width: win.width * 0.8,
            margin: 9,
            borderColor: 'white',
            borderWidth: 0.5,
            borderRadius: borderRadius,
            justifyContent: 'center',
            backgroundColor: 'white',
            fontSize: regularFontSize,
            textAlign: 'center'

    },
    ClickableText: {
        color: blueColor,
        fontSize: regularFontSize,
        fontWeight: 'bold',
    },
    WelcomeUserBanner: {
        TouchableHighlight: {
            ...shadow,
            backgroundColor: blueColor,
            borderBottomRightRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            justifyContent: 'center',
            flexDirection: 'row',
            marginRight: '30%',
            //marginTop: win.height * 0.015,
            padding: win.height * 0.025,
            marginBottom: win.height * 0.02,
            width: '75%'
        }
    },
    WhitePanelButton: {
        ...shadow,
        justifyContent: 'center',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 0.5,
        borderRadius: borderRadius,
        height: 40,
        width: 40,
        
    },

    lowerPanel: {
        overflow: 'hidden',
        backgroundColor: 'white',
        borderWidth: 0,
        borderRadius: borderRadius,
        borderBottomRightRadius: 0,
        borderBottomLeftRadius: 0,
        width: '100%',
        height: '70%',
        bottom: 0 - win.height * 0.20,
        //bottom: 0 - Math.ceil(win.height * 0.3 / 100) * 100,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute'
    }
};