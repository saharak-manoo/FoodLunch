import React, {Component} from 'react';
import {
  Alert,
  View,
  Platform,
  Dimensions,
  TouchableOpacity,
  Modal,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {connect} from 'react-redux';
import {setScreenBadgeNow, setDarkMode, setLanguage} from '../../actions';
import {Appbar, Text, HelperText, TextInput} from 'react-native-paper';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import I18n from '../../../helpers/i18n';
import * as Api from '../../actions/api';
import * as GFun from '../../../helpers/globalFunction';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import {styles} from '../../../helpers/styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: props.setting.isDarkMode,
      phoneNumber: '',
      spinner: false,
    };
  }

  sendOTPOrLogin() {
    this.loadingSendOTPOrLogin.showLoading(true);
    setTimeout(() => {
      this.loadingSendOTPOrLogin.showLoading(false);
      if (
        GFun.validatePhoneNumber(this.state.phoneNumber) &&
        this.state.phoneNumber.startsWith('0')
      ) {
        GFun.errorMessage(
          I18n.t('message.notValidate'),
          I18n.t('message.phoneNumberMustBeTen'),
        );
      } else if (!this.state.phoneNumber.startsWith('0')) {
        GFun.errorMessage(
          I18n.t('message.notValidate'),
          I18n.t('message.phoneNumberMustStartsWith'),
        );
      } else {
        GFun.successMessage(
          I18n.t('message.otp'),
          I18n.t('message.sendOTPSuccessful', {
            phoneNumber: this.state.phoneNumber,
          }),
        );
        this.props.navigation.navigate('Otp', {
          phoneNumber: this.state.phoneNumber,
        });
      }
    }, 300);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.setting.appColor,
        }}>
        <KeyboardAvoidingView
          behavior="padding"
          enabled
          style={styles.centerScreen}>
          <Animatable.Text animation={'slideInUp'} style={styles.textHead}>
            {I18n.t('text.welcome')},
          </Animatable.Text>
          <Animatable.Text animation={'slideInUp'} style={styles.textSub}>
            {I18n.t('text.fillOutToContinue')}
          </Animatable.Text>
          <Animatable.View animation={'slideInUp'}>
            <TextInput
              keyboardAppearance={this.state.isDarkMode ? 'dark' : 'light'}
              mode={'outlined'}
              placeholder={I18n.t('placeholder.phoneNumber')}
              value={this.state.phoneNumber}
              keyboardType={'numeric'}
              maxLength={10}
              onChangeText={phoneNumber =>
                this.setState({
                  phoneNumber: phoneNumber.replace(/[^0-9]/g, ''),
                })
              }
            />
          </Animatable.View>
          <HelperText
            style={{fontFamily: 'Kanit-Light', color: '#FF3260'}}
            type="error"
            visible={GFun.validatePhoneNumber(this.state.phoneNumber)}>
            {I18n.t('message.phoneNumberMustBeTen')}
          </HelperText>
          <Animatable.View
            animation={'slideInUp'}
            style={{
              alignSelf: 'center',
              paddingTop: 20,
            }}>
            <AnimateLoadingButton
              ref={c => (this.loadingSendOTPOrLogin = c)}
              titleFontFamily={'Kanit-Light'}
              width={55}
              height={55}
              title={<MaterialsIcon name="arrow-forward" size={20} />}
              backgroundColor="#03DAC6"
              borderRadius={55}
              onPress={this.sendOTPOrLogin.bind(this)}
            />
          </Animatable.View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenBadge: state.screenBadge,
  setting: state.setting,
});

const mapDispatchToProps = {
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
