/**
 * @Description: 视频
 * @author han
 * @date 2019/4/9 0009
 */
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Video extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>视频</Text>
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
