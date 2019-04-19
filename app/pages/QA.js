/**
 * @Description: 问答
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class QA extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>问答</Text>
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
