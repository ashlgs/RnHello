/**
 * @Description: 登录、注册、找回密码等标题栏
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';

export default class LoginHeader extends Component {

    render() {
        let fromPage = this.props.fromPage;
        return (
            <View style={styles.container}>
                <TouchableWithoutFeedback onPress={() => this.props.navigation.goBack()}>
                    <Image style={styles.closeButton} source={require('../../../assets/images/back_close.png')}/>
                </TouchableWithoutFeedback>
                {
                    this.renderButton(fromPage)
                }
            </View>
        )
    }

    renderButton(fromPage) {
        switch (fromPage) {
            case 'login':
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.onTapRegister()
                    }}>
                        <Text style={styles.text}>注册</Text>
                    </TouchableWithoutFeedback>
                );
            case 'register':
                return (
                    <TouchableWithoutFeedback onPress={() => {
                        this.props.onTapLogin()
                    }}>
                        <Text style={styles.text}>登录</Text>
                    </TouchableWithoutFeedback>
                );
            default :
                break
        }
    }

    return() {
        this.props.navigation.goBack();
    }

}

const styles = StyleSheet.create({
    container: {
        height: 50,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closeButton: {
        width: 24,
        height: 24
    },
    text: {
        fontSize: 18,
    }
});
