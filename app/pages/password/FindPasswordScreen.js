/**
 * @Description: 找回密码第一步：输入图片验证码
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import CommonButton from "../../components/CommonButton";
import LoginHeader from "../login/LoginHeader";
import InputContainer from "../../components/InputContainer";
import {font} from "../../styles/font";
import {colors} from "../../styles/colors";
import {dimension} from "../../styles/dimension";
import {checkPhoneNumber} from "../../utils/Utils";

export default class FindPasswordScreen extends Component {

    constructor() {
        super();
        this.state = {
            phone: '',
            verifyCode: '',
            isChecked: false,
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginHeader {...this.props} />
                <Text style={styles.title}>找回密码</Text>
                <Text style={styles.subTitle}>欢迎来到学缘网~</Text>

                <InputContainer placeholder={'手机号'}
                                maxLength={11}
                                keyboardType={'numeric'}
                                iconSign={require('../../../assets/images/icon_phone.png')}
                                iconClear={require('../../../assets/images/back_close.png')}
                                onChangeText={this.onPhoneTextChange.bind(this)}/>
                <View style={{marginTop: 12}}>
                    <InputContainer placeholder={'图片验证码'}
                                    maxLength={4}
                                    iconSign={require('../../../assets/images/icon_check_code.png')}
                                    iconClear={require('../../../assets/images/back_close.png')}
                                    onChangeText={this.onVerifyCodeTextChange.bind(this)}
                                    operateType='picture'
                                    ref={(imgCodeInput) => {
                                        this.imgCodeInput = imgCodeInput;
                                    }}
                    />
                </View>
                <CommonButton title='下一步' onButtonPress={this.onTapNextButton.bind(this)}/>
            </View>
        )
    }
    onTapNextButton() {
        if (this.checkInput()) {
            //todo 请求接口成功后跳转
            this.props.navigation.replace('ResetPassword', {phone: this.state.phone})
        }
    }
    /**
     * 下一步前检查输入项
     * @returns {boolean}
     */
    checkInput() {
        if (!checkPhoneNumber(this.state.phone)) {
            return false
        }

        if (!this.validateCheckCode()) {
            return false
        }

        return true
    }
    /**
     * 验证手机号
     * @returns {boolean}
     */
    /*validateMobile() {
        if (this.state.phone.length == 0) {
            ToastAndroid.show('请输入手机号', ToastAndroid.SHORT);
            return false;
        }
        if (this.state.phone.length != 11) {
            ToastAndroid.show('请输入有效的手机号码！', ToastAndroid.SHORT);

            return false;
        }
        let myReg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myReg.test(this.state.phone)) {
            ToastAndroid.show('请输入有效的手机号码！', ToastAndroid.SHORT);
            return false;
        }
        return true;
    }*/

    validateCheckCode() {
        if (this.state.verifyCode.length < 4) {
            ToastAndroid.show('请输入4位验证码', ToastAndroid.SHORT);
            return false;
        }
        // 核对验证码
        if (this.imgCodeInput.getCurrentImgCheckCode() !== this.state.verifyCode) {
            ToastAndroid.show('验证码有误', ToastAndroid.SHORT);
            return false;
        }
        return true

    }


    onPhoneTextChange(text) {
        this.setState({
            phone: text,
        })
    }

    onVerifyCodeTextChange(text) {
        this.setState({
            verifyCode: text,
        })
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingLeft: dimension.screenPadding,
        paddingRight: dimension.screenPadding,
    },
    title: {
        fontSize: font.accountTitleSize,
        color: colors.accountTitleColor,
        alignSelf: 'flex-start',
        marginTop: 30,
        marginLeft:15
    },
    subTitle:{
        fontSize: font.accountSubtitleSize,
        color: colors.accountSubitleColor,
        alignSelf: 'flex-start',
        marginTop: 8,
        marginBottom: 36,
        marginLeft:15
    },
});
