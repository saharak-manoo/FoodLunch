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
import {styles} from '../../../helpers/styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class OtpView extends Component {
  constructor(props) {
    super(props);
    let params = this.props.navigation.state.params;
    this.state = {
      isDarkMode: props.setting.isDarkMode,
      phoneNumber: params.phoneNumber || '',
      spinner: false,
    };
    console.log(props);
  }

  resendOTP() {
    this.loadingResendOTP.showLoading(true);
    setTimeout(() => {
      this.loadingResendOTP.showLoading(false);
      GFun.successMessage(
        I18n.t('message.otp'),
        I18n.t('message.sendOTPSuccessful', {
          phoneNumber: this.state.phoneNumber,
        }),
      );
    }, 300);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.setting.appColor,
        }}>
        <View style={styles.centerScreen}>
          <Text style={styles.textHead}>Please fill,</Text>
          <Text style={styles.textSub}>
            OTP code received from sms to continue
          </Text>
          <View style={{justifyContent: 'center'}}>
            <OTPInputView
              keyboardType={'numeric'}
              placeholderTextColor={'#000'}
              style={{width: width / 1.125, height: 25}}
              pinCount={6}
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineBase}
              codeInputHighlightStyle={styles.underlineHighLighted}
              onCodeFilled={code => {
                console.log(`Code is ${code}, you are good to go!`);
              }}
            />
          </View>
          <Text style={styles.resendOTP}>Resend OTP ?</Text>
          <View
            style={{justifyContent: 'flex-start', alignItems: 'flex-start'}}>
            <AnimateLoadingButton
              ref={c => (this.loadingResendOTP = c)}
              titleFontFamily={'Kanit-Light'}
              width={width - 300}
              height={40}
              title={I18n.t('button.resendOTP')}
              titleFontSize={12}
              titleColor="#FFF"
              backgroundColor="#03DAC6"
              borderRadius={25}
              onPress={this.resendOTP.bind(this)}
            />
          </View>
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
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpView);
