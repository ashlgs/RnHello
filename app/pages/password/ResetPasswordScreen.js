/**
 * @Description: 找回密码第二步：设置新密码
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View, ToastAndroid} from 'react-native';
import LoginHeader from "../login/LoginHeader";
import CommonButton from "../../components/CommonButton";
import InputContainer from "../../components/InputContainer";
import {font} from "../../styles/font";
import {colors} from "../../styles/colors";
import {dimension} from "../../styles/dimension";

export default class ResetPasswordScreen extends Component {

    constructor() {
        super();
        this.state = {
            verifyCode: '',
            password: '',
            isPasswordMode: true
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginHeader {...this.props}/>
                <Text style={styles.title}>找回密码</Text>
                <Text style={styles.subTitle}>请使用手机{this.props.navigation.getParam('phone')}获取短信验证码</Text>
                <InputContainer placeholder={'验证码'}
                                maxLength={6}
                                needCounting={true}
                                keyboardType={'numeric'}
                                iconSign={require('../../../assets/images/icon_check_code.png')}
                                iconClear={require('../../../assets/images/back_close.png')}
                                onChangeText={this.onVerifyCodeTextChange.bind(this)}
                                operateType='verify'/>
                <View style={{marginTop: 12}}>
                    <InputContainer placeholder={'新密码'}
                                    maxLength={20}
                                    iconSign={require('../../../assets/images/icon_pwd.png')}
                                    iconEyeClose={require('../../../assets/images/eye_close.png')}
                                    iconEyeOpen={require('../../../assets/images/eye_open.png')}
                                    iconClear={require('../../../assets/images/back_close.png')}
                                    onChangeText={this.onPasswordTextChange.bind(this)}
                                    operateType='password'/>
                </View>
                <CommonButton title='完成' onButtonPress={()=>{this.onTapFinishButton()}}/>
            </View>
        )
    }

    onTapFinishButton() {
        if (this.checkInput()) {
            console.log('----------finish---------');
            ToastAndroid.show('请求找回密码接口', ToastAndroid.SHORT)
        }

    }

    /**
     * 重置密码前检查输入
     * @returns {boolean}
     */
    checkInput() {
        if (!this.validateVerifyCode()) {
            return false
        }
        if (!this.validatePwd()) {
            return false
        }
        return true
    }

    validateVerifyCode() {
        /* if (this.state.checkToken === '') {
             ToastAndroid.show('请点击获取验证码', ToastAndroid.SHORT)
             return false
         }*/
        if (this.state.verifyCode.length < 6) {
            ToastAndroid.show('请输入6位验证码', ToastAndroid.SHORT)
            return false
        }

        return true
    }

    validatePwd() {
        if (this.state.password === '') {
            ToastAndroid.show("请输入密码", ToastAndroid.SHORT);
            return false;
        }

        //新密码验证正则
        if (this.state.password.length < 6 || this.state.password.length > 20) {
            ToastAndroid.show("密码应为6-20位字符，区分大小写", ToastAndroid.SHORT);
            return false;
        }
        return true;
    }

    onVerifyCodeTextChange(text) {
        this.setState({
            verifyCode: text,
        })
    }

    onPasswordTextChange(text) {
        this.setState({
            password: text
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
    notice: {
        fontSize: 15,
        color: 'gray',
        alignSelf: 'center',
        marginTop: 30,
        marginBottom: 30
    },
});
