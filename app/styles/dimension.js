/**
 * @Description: 通用组件宽高、页面边距等
 * @author han
 * @date 2019/4/9 0009
 */
import {Dimensions} from "react-native";
import {Platform} from 'react-native'

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

export const dimension = {

    //屏幕宽、高
    screenWidth:WINDOW_WIDTH,
    screenHeight:WINDOW_HEIGHT,
    //屏幕左右边距
    // screenPadding:WINDOW_WIDTH*0.05,
    screenPadding:15,

    //登录注册页面
    inputContainerWidth:WINDOW_WIDTH*0.9,
    inputContainerHeight:50,
    textInputHeight:45,
    textInputWidth:WINDOW_WIDTH*0.75,

    iconSignWidth:24,
    iconSignHeight:24,
    iconOperateWidth:18,
    iconOperateHeight:18,



    /** width **/
    // 导航栏左右按钮image宽度
    navImageWidth: 25,
    // 边框线宽度
    borderWidth: 1,
    // 分割线高度
    lineWidth: 0.8,

    /** height **/
    // 导航栏的高度
    navHeight: Platform.OS === 'ios' ? 64 : 56,
    // 导航栏顶部的状态栏高度
    navStatusBarHeight: Platform.OS === 'ios' ? 20 : 0,
    // 导航栏除掉状态栏的高度
    navContentHeight: Platform.OS === 'ios' ? 44 : 56,
    // tabBar的高度
    tabBar: 49,
    // 底部按钮高度
    bottonBtnHeight: 44,
    // 通用列表cell高度
    cellHeight: 44,
    // 导航栏左右按钮image高度
    navImageHeight: 25,



};
