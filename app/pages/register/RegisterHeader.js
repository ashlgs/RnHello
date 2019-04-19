/**
 *登录标题栏
 */
import React, {Component} from 'react';
import {Image, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';


export default class RegisterHeader extends Component {

    render() {

        return (
            <View style={styles.headerContainer}>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.back()
                    }}>
                    <Image style={styles.headerLeftImg} source={require('../../../assets/images/back_close.png')}/>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                    onPress={() => {
                        this.props.onHeaderRightClick()
                    }}>
                    <Text style={styles.headerRightText}>登录</Text>
                </TouchableWithoutFeedback>
            </View>
        )
    }

}

const styles = StyleSheet.create({
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
        width: 24,
        height: 24,
        resizeMode: 'contain'
    },
    headerRightText: {
        fontSize: 18,
        color: '#2b333b',
    },

});
