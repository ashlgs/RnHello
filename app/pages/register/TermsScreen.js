import React, {Component} from 'react';
import {Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View, WebView} from 'react-native';
import {get} from "../../utils/RequestUtil";


let height = (Platform.OS === 'ios' ? 20 : 0) + 49

export default class TermsScreen extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            terms: ''
        };
    }

    componentDidMount() {
        get('/mobileschools/terms', {})
            .then(res => {
                    if (res.code === 200) {
                        console.log(res.data)
                        this.setState({
                            terms: res.data.user_terms_body
                        })
                    }
                },
                err => {

                })
    }


    render() {
        return (
            <View style={styles.container}>
                {/*<StatusBar/>*/}
                <View style={styles.headerContainer}>
                    <TouchableOpacity activeOpacity={0.8} style={{flexDirection: 'row', alignItems:'center', flex: 1}} onPress={() => this.props.navigation.goBack()} >
                        <Image source={require('../../../assets/images/back_close.png')} resizeMode={'contain'} style={styles.headerLeftImg} />
                    </TouchableOpacity>

                    <View style={styles.headerCenterContainer}>
                        <Text style={styles.headerCenterText}>用户协议</Text>
                    </View>

                    {/* 为了让标题居中 */}
                    <View style={{height: 25,width: 25,justifyContent: 'center', flex: 1} }/>
                </View>
                <WebView
                    source={{html: this.state.terms, baseUrl: ''}}></WebView>
            </View>
        )

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        backgroundColor: "#fff",
        // paddingTop: height


    },
    headerContainer: {
        flexDirection: 'row',
        // backgroundColor: '#d81e06',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 49,
        elevation:1,
        // paddingTop: 25,
        borderBottomWidth:0.4,
        borderBottomColor:'#b6b6b6',
        paddingLeft:15,
        paddingRight:15
    },
    headerLeftImg: {
        width:25,
        height:25,
    },
    headerCenterContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 36,
        flex: 4,
    },
    headerCenterText: {
        fontSize: 18,
        color: '#2b333b',
    },
    headerRightImg: {
        width: 40,
        height: 40,
    },

})