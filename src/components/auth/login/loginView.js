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

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.setting.appColor,
        }}>
        <View style={styles.centerScreen}>
          <Text style={styles.textHead}>Welcome,</Text>
          <Text style={styles.textSub}>Fill out to continue</Text>
          <TextInput
            mode={'outlined'}
            placeholder={'Phone number'}
            value={this.state.phoneNumber}
            keyboardType="numeric"
            maxLength={10}
            onChangeText={phoneNumber =>
              this.setState({phoneNumber: phoneNumber.replace(/[^0-9]/g, '')})
            }
          />
          <HelperText
            style={{fontFamily: 'Kanit-Light', color: '#FF3260'}}
            type="error"
            visible={GFun.validatePhoneNumber(this.state.phoneNumber)}>
            {I18n.t('message.validatePhoneNumber')}
          </HelperText>
          <View
            style={{
              alignSelf: 'center',
              paddingTop: 20,
            }}>
            <Icon
              disabled={this.state.phoneNumber.length !== 10}
              raised
              name={'arrow-forward'}
              type={'material-icons'}
              color={'#03DAC6'}
              onPress={() =>
                this.props.navigation.navigate('Otp', {
                  phoneNumber: this.state.phoneNumber,
                })
              }
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
