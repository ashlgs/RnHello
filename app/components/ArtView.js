import React, {Component, PureComponent} from 'react';
import {
    AppRegistry,
    StyleSheet,
    ART,
    View, TouchableOpacity
} from 'react-native';
import {PixelRatio, Dimensions} from 'react-native';

const dp2px = dp => PixelRatio.getPixelSizeForLayoutSize(dp);
const {Surface, Text, Transform, Path} = ART;
ART.Surface
const chars = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    /* 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
     'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
     'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',*/
];
//
export default class ArtTextView extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            charArray: '',  // 透明度初始值设为0
        }
    }

    static defaultProps = {}

    componentDidMount() {
        this.setState({
            charArray: this.createCharArray()
        })
    }

    getCurrentCode() {
        return this.state.charArray
    }

    createCharArray() {
        let str = '';
        for (let i = 0; i < 4; i++) {
            str += chars[Math.floor(Math.random() * (chars.length))]
        }
        console.log('####ART', str)
        return str
    }

    render() {

        return (
            <TouchableOpacity
                style={this.props.style}
                activeOpacity={0.8}
                onPress={() => {
                    this.changeCode()
                }}>
                {this.renderView()}

            </TouchableOpacity>

        );
    }

    changeCode() {

        this.setState({
            charArray: this.createCharArray()
        })
    }

    renderText() {
        let trans = new Transform();

        trans.rotate(-10);
        console.log('###renderText************')
        return <Text strokeWidth={1} stroke="#853eff" font={"bold 24 Heiti SC"} x={10} y={10}
                     transform={trans}>{this.state.charArray}</Text>

    }

    renderView() {
        const path = new ART.Path();
        let w = 80;
        let h = 40;
        path.moveTo(0, Math.random())//必须有并且随机值,否则不更新
        /*path.moveTo(5, 10 + Math.floor(Math.random() * (h - 20))); //将起始点移动到(1,1) 默认(0,0)
        path.lineTo(w - 5, 10 + Math.floor(Math.random() * (h - 20))); //连线到目标点(300,1)
        path.moveTo(5, 10 + Math.floor(Math.random() * (h - 20))); //将起始点移动到(1,1) 默认(0,0)
        path.lineTo(w - 5, 10 + Math.floor(Math.random() * (h - 20))); //连线到目标点(300,1)*/


        return (<View style={{backgroundColor: '#FFEFDB'}}>
            <Surface width={80} height={40}>
                <ART.Shape d={path} stroke="#1b6da1" strokeWidth={1}/>
                {this.renderText()}
                {/*<Text strokeWidth={1} stroke="#853eff" font="bold 30px Heiti SC">{this.state.charArray}</Text>*/}
            </Surface>

        </View>)
    }
}

/*const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: 80,
        height: 40,
        borderColor: '#ff4285',
        borderWidth: 1
    },

});*/
