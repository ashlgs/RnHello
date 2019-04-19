/**
 * @Description: 底部用户协议组件
 * @author lgs
 * @date 2019/4/13
 */
import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Terms extends Component {

    render() {
        return (
            <View style={styles.termsContainer}>

                <Text style={[styles.termsTxt, {color: '#71777d'}]}>注册即代表已同意</Text>
                <TouchableOpacity activeOpacity={0.8} onPress={() => {
                    this.props.navigation.navigate('TermsScreen')
                }}>
                    <Text style={[styles.termsTxt, {color: "#0078d7"}]}>《服务协议》</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    termsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 15
    },
    termsTxt: {
        fontSize: 16
    }

});
