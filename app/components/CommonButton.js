/**
 * @Description: 登录、注册、找回密码等底部Button
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export default class CommonButton extends Component {

    render() {
        return (
            <TouchableOpacity style={styles.container} onPress={() => {
                this.props.onButtonPress()
            }} activeOpacity={0.5}>
                <Text style={styles.text}>{this.props.title}</Text>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 40,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#e85454",
        borderRadius: 20,
        marginLeft: 15,
        marginRight: 15,
    },
    text: {
        fontSize: 15,
        color: 'white',
        alignSelf: 'center'
    }

});
