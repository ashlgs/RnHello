/**
 *注册
 */
import React, {Component} from 'react';
import {
    Button,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import {screen} from "../../utils/DimentionUtil";
import InputContainer from "../../components/InputContainer";
import {dimension} from "../../styles/dimension";
import CommonButton from "../../components/CommonButton";
import Terms from "../../components/Terms";
import {font} from "../../styles/font";
import {colors} from "../../styles/colors";


export default class RegisterNext extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            pwd: '',
            verifyCode: '',
            checkToken: '',
            isChecked: false,
            isCountDown: false,//是否正在倒计时
            count: 59,//倒计时剩余时长

            isHidePwd: true
        }
    }

    componentDidMount() {
        this.setState({
            isCountDown: true,
            count: 59
        }, () => {
            this.timer = setInterval(this.onTimer, 1000);
        })
    }

    onPressRegister() {
        if (this.checkInput()) {
            //todo:网络请求注册
            ToastAndroid.show('请求注册接口', ToastAndroid.SHORT)
        }
    }

    /**
     * 注册网络请求前检查输入项
     */
    checkInput() {

        if (!this.validateUsername()) {
            return false
        }
        if (!this.validatePwd()) {
            return false
        }
        if (!this.validateVerifyCode()) {
            return false
        }

        return true
    }

    validateUsername() {
        if (this.state.username.length === 0) {
            ToastAndroid.show("请输入用户名", ToastAndroid.SHORT);
            return false;
        }

        let nickLength = this.getCharLength(this.state.username)
        if (nickLength < 4 || nickLength > 18) {
            ToastAndroid.show("用户名应为4-18字符", ToastAndroid.SHORT);
            return false;
        }
        //   ^[a-zA-Z0-9_\u4e00-\u9fa5]+$
        if (!this.isCommonCh(this.state.username)) {
            ToastAndroid.show("用户名为中文、字母、数字或下划线组成", ToastAndroid.SHORT);
            return false;
        }
        return true;
    }

    /**
     * 统计字符数
     */
    getCharLength(str) {
        let len = 0;
        for (let i = 0; i < str.length; i++) {
            let a = str.charAt(i);
            if (a.match(/[^\x00-\xff]/ig) != null) {
                len += 2;
            }
            else {
                len += 1;
            }
        }
        console.log(len)
        return len;
    }

    isCommonCh(str) {
        var reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
        return reg.test(str)
    }

    validatePwd() {
        if (this.state.pwd === '') {
            ToastAndroid.show("请输入密码", ToastAndroid.SHORT);
            return false;
        }

        //新密码验证正则
        if (this.state.pwd.length < 6 || this.state.pwd.length > 20) {
            ToastAndroid.show("密码应为6-20位字符，区分大小写", ToastAndroid.SHORT);
            return false;
        }
        return true;
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

    back() {
        this.props.navigation.pop()
    }

    /**
     * 倒计时,更新时间
     */
    onTimer = () => {
        if (this.state.count > 0) {
            this.setState({count: this.state.count - 1});
        } else {
            this.setState({
                isCountDown: false,
                checkToken: ''
            });
            clearInterval(this.timer);

        }
    };


    componentWillUnmount() {
        clearInterval(this.timer);
    }
    onVerifyCodeTextChange(text) {
        this.setState({
            verifyCode: text,
        })
    }
    onUserNameTextChange(text){
        this.setState({
            username: text,
        })
    }
    onPasswordTextChange(text) {
        this.setState({
            pwd: text,
        })
    }
    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            this.back()
                        }}>
                        <Image style={styles.headerLeftImg} source={require('../../../assets/images/back_close.png')}/>
                    </TouchableWithoutFeedback>
                </View>
                <Text style={styles.title}>注册账号</Text>
                <Text style={styles.subTitle}>短信验证码已发送至{this.props.navigation.getParam('phone')}</Text>


                <InputContainer placeholder={'验证码'}
                                maxLength={6}
                                needCounting={true}
                                keyboardType={'numeric'}
                                iconSign={require('../../../assets/images/icon_check_code.png')}
                                iconClear={require('../../../assets/images/back_close.png')}
                                onChangeText={this.onVerifyCodeTextChange.bind(this)}
                                operateType='verify'/>
                <InputContainer placeholder={'用户名4-20位，中文、字母、数字、\'_\''}
                                maxLength={18}
                                iconSign={require('../../../assets/images/icon_user_name.png')}
                                iconClear={require('../../../assets/images/back_close.png')}
                                onChangeText={this.onUserNameTextChange.bind(this)}
                />
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
                <CommonButton title='注册' onButtonPress={this.onPressRegister.bind(this)}/>

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
    headerContainer: {
        flexDirection: 'row',
        // backgroundColor: '#d81e06',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 49,
        // paddingTop: 25,
        paddingRight: 15

    },
    headerLeftImg: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
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
    smsTips: {
        fontSize: 13,
        color: '#2b333b',
        alignSelf: 'center',
        marginTop: 16,
        marginBottom: 30

    },
    btnRegister: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 40,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e85454",
        borderRadius: 20,
        marginLeft: 30,
        marginRight: 30,
    },

});
