/**
 * @Description: 路由配置:所有组件都必须在这里注册
 * @author han
 * @date 2019/4/9 0009
 */
import MainTab from './TabNavigator'
import TermsScreen from "./pages/register/TermsScreen";
import FindPasswordScreen from "./pages/password/FindPasswordScreen";
import ResetPasswordScreen from "./pages/password/ResetPasswordScreen";
import Register from "./pages/register/Register";
import RegisterNext from "./pages/register/RegisterNext";
import AccountLogin from "./pages/login/AccountLogin";
import SmsLogin from "./pages/login/SmsLogin";

const RouteConfig = {
    Tab: {
        screen: MainTab,
        navigationOptions: {
            header: null
        }
    },
    AccountRegister: {
        // screen: RegisterScreen,
        screen: Register,
        navigationOptions: {
            header: null
        }
    },

    AccountLogin: {
        screen: AccountLogin,
        navigationOptions: {
            header: null
        }
    },
    SmsLogin: {
        screen: SmsLogin,
        navigationOptions: {
            header: null
        }
    },

    AccountRegisterNext: {
        screen: RegisterNext,
        navigationOptions: {
            header: null
        }
    },
    FindPassword: {
        screen: FindPasswordScreen,
        navigationOptions: {
            header: null
        }
    },
    TermsScreen: {
        screen: TermsScreen,
        navigationOptions: {
            header: null
        }
    },
    ResetPassword: {
        screen: ResetPasswordScreen,
        navigationOptions: {
            header: null
        }
    },
};

export default RouteConfig;
