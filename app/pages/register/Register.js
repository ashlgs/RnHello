/**
 *注册
 */
import React, {Component} from 'react';
import {StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import RegisterHeader from "./RegisterHeader";
import {dimension} from "../../styles/dimension";
import InputContainer from "../../components/InputContainer";
import CommonButton from "../../components/CommonButton";
import Terms from "../../components/Terms";
import {checkPhoneNumber} from "../../utils/Utils";
import {font} from "../../styles/font";
import {colors} from "../../styles/colors";


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            phone: '',
            verifyCode: '',
            checkToken: '',
            isChecked: false,
        }
    }

    back() {
        this.props.navigation.pop()
    }

    onHeaderRightClick() {
        this.props.navigation.replace('AccountLogin')
    }

    onTapNextButton() {
        if (this.checkInput()) {
            //todo 请求接口成功后跳转
            this.props.navigation.replace('AccountRegisterNext', {phone: this.state.phone})
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

    validateCheckCode() {
        if (this.state.verifyCode.length < 1 || this.state.verifyCode.length > 4) {
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
    render() {
        return (
            <View style={styles.container}>
                <RegisterHeader back={() => this.back()} onHeaderRightClick={() => this.onHeaderRightClick()}/>
                <Text style={styles.title}>注册账号</Text>
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
                <Terms {...this.props}/>
            </View>
        )
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
    inputContainer: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 12
    },

});
