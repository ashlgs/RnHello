/**
 * @Description:
 * @author han
 * @date 2019/4/9 0009
 */
import StackViewStyleInterpolator from 'react-navigation-stack/dist/views/StackView/StackViewStyleInterpolator'
// 默认横向跳转
// 如果即将要跳转到的页面需要其它跳转方式
// 可在路由参数中传入 transition参数，可选值有：forHorizontal,forVertical,forFadeFromBottomAndroid,forFade
// 示例定义竖向跳转：this.props.navigation.push('ProdDetail', {'prodID': item.id, 'transition':'forVertical'})
const screenInterpolater = (sceneProps) => {
    const {route} = sceneProps.scene;
    const params = route.params || {};
    const transition = params.transition || 'forHorizontal';
    return StackViewStyleInterpolator[transition](sceneProps);
};

const StackNavigationConfig = {
    initialRouteName: 'MainTab',
    headerMode: 'float',
    transitionConfig: () => ({
        //screenInterpolater: screenInterpolater
        screenInterpolater: StackViewStyleInterpolator.forHorizontal
    })
}

export default StackNavigationConfig;
