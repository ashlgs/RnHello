/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {createAppContainer,createStackNavigator} from 'react-navigation'
import RouteConfig from "./app/RouteConfig";
import StackNavigatorConfig from "./app/StackNavigatorConfig";

// const Navigator=createStackNavigator(RouteConfig,StackNavigatorConfig);
const Navigator=createStackNavigator(RouteConfig);
const AppStackNavigator = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return (
      <AppStackNavigator/>
    );
  }
}

