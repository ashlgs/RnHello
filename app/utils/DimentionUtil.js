/**
 * @Description:
 * @author han
 * @date 2019/4/9 0009
 * @Deprecated
 */
import {Dimensions, Platform, StatusBar} from "react-native";

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;
const TITLE_BAR_HEIGHT = (Platform.OS === 'ios' ? 20 : 0) + 45;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight;
const SCREEN_PADDING = WINDOW_WIDTH * 0.05;

export const screen = {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    titleBarHeight: TITLE_BAR_HEIGHT,
    statusBarHeight: STATUS_BAR_HEIGHT,
    padding: SCREEN_PADDING,
};



