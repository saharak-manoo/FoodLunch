import React, {Component, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  Platform,
  Modal,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
  ImageBackground,
  StatusBar,
  SafeAreaView,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {connect} from 'react-redux';
import {
  setScreenBadge,
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
  setPositionNow,
} from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar, Text, Searchbar, RadioButton} from 'react-native-paper';
import I18n from '../../helpers/i18n';
import * as Api from '../actions/api';
import * as GFun from '../../helpers/globalFunction';
import {styles} from '../../helpers/styles';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import NumericInput from 'react-native-numeric-input';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class BasketView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isDarkMode: props.setting.isDarkMode,
      menu: null,
      spinner: false,
      amount: 1,
      status: 'normal',
    };
  }

  sumPrice() {
    let total = 0;
    this.props.basket.menus.forEach(m => {
      total += m.price * m.amount;
      if (m.isExtra) {
        total += 15;
      }
    });

    return total;
  }

  sumMenuPrice(price, amount, isExtra) {
    let total = price * amount;
    if (isExtra) {
      total += 15;
    }

    return total;
  }

  click() {
    this.loadingPlaceOrder.showLoading(true);
    setTimeout(() => {
      this.loadingPlaceOrder.showLoading(false);
      this.props.modal.current.close();
      this.props.onOpenMap();
    }, 600);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          height: height / 1.5,
          padding: 30,
          backgroundColor: '#FFF',
          borderRadius: 10,
        }}>
        <View style={{flex: 0.2, paddingBottom: 35}}>
          <Text
            style={{
              fontSize: 35,
              fontFamily: 'Kanit-Light',
              textAlign: 'left',
            }}>
            {'ตระกร้าสินค้า'}
          </Text>
        </View>

        {this.props.basket.menus.map(menu => {
          return (
            <View style={{flexDirection: 'row', flex: 0.2}}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Kanit-Light',
                  textAlign: 'left',
                }}>
                {`${menu.name} ${menu.isExtra ? 'ธรรมดา' : 'พิเศษ'} x ${
                  menu.amount
                } ชุด`}
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'Kanit-Light',
                  marginLeft: 'auto',
                }}>
                {this.sumMenuPrice(
                  menu.price,
                  menu.amount,
                  menu.isExtra,
                ).toFixed(2)}
              </Text>
            </View>
          );
        })}

        <View style={{flex: 1, paddingBottom: 25, justifyContent: 'flex-end'}}>
          <View style={{flexDirection: 'row', flex: 0.2}}>
            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Kanit-Light',
                textAlign: 'left',
                paddingBottom: 20,
              }}>
              {'รวมทั้งหมด'}
            </Text>

            <Text
              style={{
                fontSize: 25,
                fontFamily: 'Kanit-Light',
                marginLeft: 'auto',
              }}>
              {this.sumPrice().toFixed(2)}
            </Text>
          </View>
          <AnimateLoadingButton
            ref={c => (this.loadingPlaceOrder = c)}
            width={width - 35}
            height={50}
            titleFontFamily={'Kanit-Light'}
            title={'Place Order'}
            titleFontSize={18}
            titleColor="#FFF"
            backgroundColor="#03DAC6"
            borderRadius={25}
            onPress={this.click.bind(this)}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenBadge: state.screenBadge,
  setting: state.setting,
  localtion: state.localtion,
  basket: state.basket,
});

const mapDispatchToProps = {
  setScreenBadge,
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
  setPositionNow,
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketView);
