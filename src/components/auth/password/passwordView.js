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

class PasswordView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: props.setting.isDarkMode,
      password: '',
      confirmPassword: '',
      spinner: false,
    };
  }

  createUser() {
    this.loadingRegister.showLoading(true);
    setTimeout(() => {
      this.loadingRegister.showLoading(false);
      if (
        GFun.validateBlank(this.state.password) ||
        GFun.validateBlank(this.state.confirmPassword)
      ) {
        GFun.errorMessage(
          I18n.t('message.notValidate'),
          I18n.t('message.pleaseInputAllValue'),
        );
      } else if (
        GFun.validatePasswordMatch(
          this.state.password,
          this.state.confirmPassword,
        )
      ) {
        GFun.errorMessage(
          I18n.t('message.notValidate'),
          I18n.t('message.passwordNotMatch'),
        );
      } else {
        GFun.successMessage(
          I18n.t('message.login'),
          I18n.t('message.loginSuccessful'),
        );
        this.props.navigation.navigate('Restaurant');
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
        <View style={styles.centerScreen}>
          <Text style={styles.textHead}>
            {I18n.t('text.settingYourPassword')},
          </Text>
          <Text style={styles.textSub}>{I18n.t('text.fillOutToContinue')}</Text>
          <TextInput
            keyboardAppearance={this.state.isDarkMode ? 'dark' : 'light'}
            mode={'outlined'}
            secureTextEntry
            autoCorrect={false}
            placeholder={I18n.t('placeholder.password')}
            value={this.state.password}
            onChangeText={password => this.setState({password: password})}
          />
          <HelperText
            style={{fontFamily: 'Kanit-Light', color: '#FF3260'}}
            type="error"
            visible={GFun.validatePasswordLessThanSix(this.state.password)}>
            {I18n.t('message.passwordLessThanSix')}
          </HelperText>

          <TextInput
            secureTextEntry
            autoCorrect={false}
            keyboardAppearance={this.state.isDarkMode ? 'dark' : 'light'}
            placeholder={I18n.t('placeholder.confirmPassword')}
            mode={'outlined'}
            value={this.state.confirmPassword}
            onChangeText={confirmPassword =>
              this.setState({confirmPassword: confirmPassword})
            }
          />
          <HelperText
            style={{fontFamily: 'Kanit-Light', color: '#FF3260'}}
            type={'error'}
            visible={GFun.validatePasswordMatch(
              this.state.password,
              this.state.confirmPassword,
            )}>
            {I18n.t('message.passwordNotMatch')}
          </HelperText>
          <View
            style={{
              alignSelf: 'center',
              paddingTop: 20,
            }}>
            <AnimateLoadingButton
              ref={c => (this.loadingRegister = c)}
              titleFontFamily={'Kanit-Light'}
              width={55}
              height={55}
              title={<MaterialsIcon name="arrow-forward" size={20} />}
              backgroundColor="#03DAC6"
              borderRadius={55}
              onPress={this.createUser.bind(this)}
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

export default connect(mapStateToProps, mapDispatchToProps)(PasswordView);
