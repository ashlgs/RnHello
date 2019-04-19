/**
 * @Description: 登录、注册、找回密码等输入框组件
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from 'react-native';
import {dimension} from "../styles/dimension";
import ArtView from "./ArtView";


export default class InputContainer extends Component {
    constructor() {
        super();
        this.state = {
            isPasswordVisible: false,
            isCountingDown: false,
            count: 60,
            contentInput: '',//目前不特指用户名,是非密码输入框的当前内容
        }
    }

    componentDidMount() {
        //是否立即倒计时
        if (this.props.operateType === 'verify' && this.props.needCounting) {
            this.countDown()
        }
    }

    componentWillUnmount() {
        //清除计时器
        this.timer && clearInterval(this.timer)
    }

    render() {
        let placeHolder = this.props.placeholder;
        let iconSign = this.props.iconSign;
        let operateType = this.props.operateType;
        return (
            <View style={styles.inputContainer}>
                <Image style={styles.iconSign} source={iconSign}/>
                {
                    this.renderTextInput(placeHolder)
                }
                {
                    this.renderClr()
                }
                {
                    this.renderOperate(operateType)
                }
            </View>
        )
    }

    renderTextInput(placeHolder) {
        return (
            <TextInput
                ref={ref => this.contentInput = ref}
                style={styles.textInput}
                placeholder={placeHolder}
                maxLength={this.props.maxLength}
                keyboardType={this.props.keyboardType || 'default'}
                secureTextEntry={this.props.operateType === 'password' && !this.state.isPasswordVisible}
                onChangeText={(text) => {
                    this.setState({contentInput: text});
                    this.props.onChangeText(text)
                }}/>
        )
    }

    renderClr() {
        return (
            this.state.contentInput !== '' ?
                <TouchableWithoutFeedback onPress={() => {
                    this.onTapClear()
                }}>
                    <Image style={styles.iconClr} source={this.props.iconClear}/>
                </TouchableWithoutFeedback> : null
        )
    }

    renderOperate(operateType) {
        switch (operateType) {
            case 'password':
                return (
                    this.state.isPasswordVisible ?
                        <TouchableWithoutFeedback onPress={() => {
                            this.onTapEyeClose()
                        }}>
                            <Image style={styles.iconOperate} source={this.props.iconEyeOpen}/>
                        </TouchableWithoutFeedback> :
                        <TouchableWithoutFeedback onPress={() => {
                            this.onTapEyeOpen()
                        }}>
                            <Image style={styles.iconOperate} source={this.props.iconEyeClose}/>
                        </TouchableWithoutFeedback>
                );
            case 'verify':
                return (
                    <View style={styles.verifyContainer}>
                        {this.state.isCountingDown ?
                            <Text style={styles.seconds}>{this.state.count}s</Text> :
                            <Text style={styles.verifyText} onPress={() => {
                                this.onTapGetVerifyCode()
                            }}>获取验证码</Text>
                        }
                    </View>
                );
            case 'picture':
                //TODO:生成图片验证码
                return (
                    <ArtView style={{}} ref={(imgCodeView) => {
                        this.imgCodeView = imgCodeView;
                    }}/>
                );
            default:
                break
        }

    }

    getCurrentImgCheckCode() {
        return this.imgCodeView.getCurrentCode()
    }

    onTapGetVerifyCode() {
        // if(checkPhoneNumber(this.state.contentInput)){
        this.countDown();
        // }
    }

    //验证码防止连续点击倒计时进度翻倍
    countDown() {
        console.log('----count down---');
        this.setState({
            isCountingDown: true,
            count: this.state.count - 1
        }, () => {
            this.timer = setInterval(this.onTimer, 1000);
        })
    }

    /**
     * 倒计时,更新时间
     */
    onTimer = () => {
        if (this.state.count > 0) {
            this.setState({count: this.state.count - 1});
        } else {
            this.setState({
                isCountingDown: false,
                checkToken: ''
            });
            clearInterval(this.timer);

        }
    };

    onTapClear() {
        this.contentInput.clear();
        this.setState({contentInput: ''})//置空->隐藏"x"
        this.props.onChangeText('')
    }

    onTapEyeOpen() {
        this.setState({
            isPasswordVisible: true
        })
    }

    onTapEyeClose() {
        this.setState({
            isPasswordVisible: false
        })
    }

}

const styles = StyleSheet.create({
    inputContainer: {
        height: dimension.inputContainerHeight,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: '#979797',
        marginLeft: 15,
        marginRight: 15,
    },
    iconSign: {
        width: dimension.iconSignWidth,
        height: dimension.iconSignHeight,
    },
    iconOperate: {
        width: dimension.iconOperateWidth,
        height: dimension.iconOperateHeight,
        marginLeft: 8,
        paddingLeft: 8
    },
    iconClr: {
        width: dimension.iconOperateWidth,
        height: dimension.iconOperateHeight,
        paddingLeft: 8,
        paddingRight: 8,
        marginLeft: 8,
        marginRight: 8
    },
    textInput: {
        height: dimension.textInputHeight,
        flex: 1,
        marginLeft: 8,
        borderBottomWidth: 0,
        fontSize: 15,
    },
    verifyContainer:{
        height:32,
        width:88,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#f4f4f6',
        borderRadius:16
    },
    verifyText: {
        fontSize: 14,
        color: '#d43030',
        position: 'relative',
    },
    seconds: {
        fontSize: 14,
        color: 'blue',
    }
});
