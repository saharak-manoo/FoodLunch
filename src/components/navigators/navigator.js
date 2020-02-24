import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import I18n from '../../helpers/i18n';
import AsyncStorage from '@react-native-community/async-storage';
import {Badge} from 'react-native-elements';

// View
import RestaurantView from '../restaurant/restaurantView';
import LogoView from '../logo/logoView';
import LoginView from '../auth/login/loginView';
import OtpView from '../auth/otp/otpView';
import PasswordView from '../auth/password/passwordView';
import MenuView from '../menu/menuView';

const AuthStack = createStackNavigator(
  {
    Login: {screen: LoginView},
    Otp: {screen: OtpView},
    Password: {screen: PasswordView},
  },
  {
    headerMode: 'none',
  },
);

const RestaurantStack = createStackNavigator(
  {
    Restaurant: {screen: RestaurantView},
    Menu: {screen: MenuView},
  },
  {
    headerMode: 'none',
  },
);

const MainNavigator = createMaterialBottomTabNavigator(
  {
    Restaurant: {
      screen: RestaurantStack,
    },
  },
  {
    initialRouteName: 'Restaurant',
    activeColor: '#2370E6',
    inactiveColor: '#202020',
    barStyle: {backgroundColor: '#202020'},
    labeled: false,
  },
);

const AppNavigator = createSwitchNavigator(
  {
    Logo: LogoView,
    Auth: AuthStack,
    App: RestaurantStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Logo',
  },
);

const Navigator = createAppContainer(AppNavigator);

export default Navigator;
