/**
 *@description: 通用工具
 * @author: han
 * @date:   2019/4/9 0009
 */


import {ToastAndroid} from 'react-native';

/**
 * 检验是否有效手机号
 * @param phoneNumber
 * @returns {boolean}
 */
export function checkPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 0) {
        ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
        return false;
    }
    if (phoneNumber.length !== 11) {
        ToastAndroid.show('请输入有效的手机号码！', ToastAndroid.SHORT);
        return false;
    }
    let myReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myReg.test(phoneNumber)) {
        ToastAndroid.show('请输入有效的手机号码！', ToastAndroid.SHORT);
        return false;
    }
    return true;
}
