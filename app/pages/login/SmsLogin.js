/**
 * @Description: 短信登录
 * @author lgs
 * @date 2019/4/13
 */

import React, {Component} from 'react';
import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import LoginHeader from "./LoginHeader";
import CommonButton from "../../components/CommonButton";
import {dimension} from "../../styles/dimension";
import {colors} from "../../styles/colors";
import {font} from "../../styles/font";
import InputContainer from "../../components/InputContainer";
import {checkPhoneNumber} from "../../utils/Utils";

export default class SmsLogin extends Component {

    constructor() {
        super();
        this.state = {
            phone: '',
            verifyCode: '',
            isLoginByAccount: true,

            code:'123456'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginHeader {...this.props} fromPage='login' onTapRegister={() => {
                    this.onTapRegister()
                }}/>
                <Text style={styles.title}>短信登录</Text>
                <Text style={styles.subTitle}>欢迎来到学缘网~</Text>
                <InputContainer placeholder={'手机号'}
                                maxLength={11}
                                keyboardType={'numeric'}
                                iconSign={require('../../../assets/images/icon_phone.png')}
                                iconClear={require('../../../assets/images/back_close.png')}
                                onChangeText={this.onUserPhoneTextChange.bind(this)}
                />
                {
                    <View style={{marginTop: 12}}>
                        <InputContainer placeholder={'验证码'}
                                        maxLength={6}
                                        keyboardType={'numeric'}
                                        iconSign={require('../../../assets/images/icon_check_code.png')}
                                        iconClear={require('../../../assets/images/back_close.png')}
                                        onChangeText={this.onVerifyCodeTextChange.bind(this)}
                                        operateType='verify'
                        />
                    </View>
                }
                <CommonButton title='登录' onButtonPress={this.onTapSmsLoginButton.bind(this)}/>
                {
                    this.renderBottom()
                }
            </View>
        )
    }

    renderBottom() {
        return (
            <View style={styles.bottomContainerCenter}>
                <Text onPress={() => {
                    this.onTapAccountLogin()
                }}>账号密码登录</Text>
            </View>
        )
    }

    onTapRegister() {
        this.props.navigation.replace('AccountRegister');
    }


    /**
     * 短信登录,点击事件
     */
    onTapSmsLoginButton() {
        if (!checkPhoneNumber(this.state.phone)) {
            return
        }
        if (!this.validateCheckCode()) {
            return
        }
        this.smsLogin();
    }

    validateCheckCode() {
        //todo 区分是否以获取验证码,是否过时等情况
        if (this.state.verifyCode.length < 6) {
            ToastAndroid.show('请输入6位验证码', ToastAndroid.SHORT);
            return false;
        }
        return true

    }

    smsLogin() {
        ToastAndroid.show('短信登录', ToastAndroid.SHORT);
    }

    onUserPhoneTextChange(text) {
        console.log('---onPhoneTextChange---text===' + text);
        this.setState({
            phone: text,
        })
    }

    onVerifyCodeTextChange(text) {
        console.log('---onPasswordTextChange---text===' + text);
        this.setState({
            verifyCode: text,
        })

    }

    onTapAccountLogin() {
        //todo 跳转到账号登录
        this.props.navigation.replace('AccountLogin');

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
    bottomContainer: {
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
    bottomContainerCenter: {
        height: 60,
        alignItems: 'center',
        justifyContent: 'center'
    }

});

