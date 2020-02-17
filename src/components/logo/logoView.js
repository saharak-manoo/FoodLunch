import React, {Component} from 'react';
import {Alert, View, Platform, Dimensions, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import I18n from '../../helpers/i18n';
import {connect} from 'react-redux';
import {setDarkMode, setLanguage} from '../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class LogoView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      isSignIn: false,
    };
  }

  async UNSAFE_componentWillMount() {
    let isDarkMode = await AsyncStorage.getItem('isDarkMode');
    isDarkMode = JSON.parse(isDarkMode);
    if (isDarkMode == null) {
      isDarkMode = false;
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(false));
    }
    this.setState({isDarkMode: isDarkMode});
    this.props.setDarkMode(isDarkMode);

    let isSignIn = await AsyncStorage.getItem('user');
    await this.setState({isSignIn: isSignIn != null});
    if (this.state.isSignIn) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.state.isDarkMode ? '#000' : '#FFF',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'stretch',
            alignSelf: 'center',
          }}>
          <Image
            style={{width: 145, height: 145}}
            source={require('../../images/app-logo.png')}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenBadge: state.screenBadge,
  setting: state.setting,
});

const mapDispatchToProps = {
  setDarkMode,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoView);
