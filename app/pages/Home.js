/**
 * @Description: 首页
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';

import {Button, StyleSheet, Text, View} from 'react-native';

export default class Home extends Component {

    constructor() {
        super();
        this.state = {
            text: ''
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>首页</Text>
                <Button style={[styles.text, {marginTop: 30}]} title='账号登录'
                        onPress={() => this.props.navigation.navigate('AccountLogin')}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 25,
        color: 'black'
    }

});
