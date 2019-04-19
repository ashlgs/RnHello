/**
 * @Description: 账号登录
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
import {post} from "../../utils/RequestUtil";

export default class AccountLogin extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isPasswordVisible: false,
            isLoginByAccount: true,//
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <LoginHeader {...this.props} fromPage='login' onTapRegister={() => {
                    this.onTapRegister()
                }}/>
                <Text style={styles.title}>账号登录</Text>
                <Text style={styles.subTitle}>欢迎来到学缘网~</Text>


                <InputContainer placeholder={'用户名/手机号/邮箱'}
                                maxLength={20}
                                iconSign={require('../../../assets/images/icon_user_name.png')}
                                iconClear={require('../../../assets/images/back_close.png')}
                                onChangeText={this.onUserNameTextChange.bind(this)}
                />
                {
                    <View style={{marginTop: 12}}>
                        <InputContainer placeholder={'密码'}
                                        maxLength={20}
                                        iconSign={require('../../../assets/images/icon_pwd.png')}
                                        iconEyeClose={require('../../../assets/images/eye_close.png')}
                                        iconEyeOpen={require('../../../assets/images/eye_open.png')}
                                        iconClear={require('../../../assets/images/back_close.png')}
                                        onChangeText={this.onPasswordTextChange.bind(this)}
                                        operateType='password'/>
                    </View>
                }
                <CommonButton title='登录'
                              onButtonPress={this.onTapAccountLoginButton.bind(this)}/>
                {
                    this.renderBottom()
                }
            </View>
        )
    }

    renderBottom() {
        return (
            <View style={styles.bottomContainer}>
                <Text onPress={() => {
                    this.onTapSmsLogin()
                }}>手机短信登录</Text>
                <Text onPress={() => {
                    this.onTapForgotPassword()
                }}>忘记密码</Text>
            </View>
        )
    }

    onTapRegister() {
        this.props.navigation.replace('AccountRegister');
    }

    /**
     * 账号密码登录,点击事件
     */
    onTapAccountLoginButton() {
        if (this.state.username === '' || this.state.password === '') {
            ToastAndroid.show("用户名或密码不能为空", ToastAndroid.SHORT);
            return
        }
        this.accountLogin();
    }

    /**
     * 网络请求,登录
     */
    accountLogin() {
        let data = {'nickname': this.state.username, 'password': this.state.password};
        let header = {"Content-Type": "application/x-www-form-urlencoded"};
        post('/users/login', JSON.stringify(data), header).then(res => {
            if (res.code !== '200') {
                ToastAndroid.show(res.message, ToastAndroid.SHORT);
            }
        }, err => {
            ToastAndroid.show(err.message, ToastAndroid.SHORT);
        })
    }

    onUserNameTextChange(text) {
        console.log('---onUserNameTextChange---text===' + text);
        this.setState({
            username: text,
        })
    }

    onPasswordTextChange(text) {
        console.log('---onPasswordTextChange---text===' + text);
        this.setState({
            password: text,
        })
    }


    onTapSmsLogin() {
        //todo 添加跳转链接
        this.props.navigation.navigate('SmsLogin')

    }


    onTapForgotPassword() {
        this.props.navigation.navigate('FindPassword')
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
