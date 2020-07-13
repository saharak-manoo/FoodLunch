import React, {Component, useRef} from 'react';
import {
  Dimensions,
  Platform,
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
  setBasket,
} from '../actions';
import {Text, RadioButton} from 'react-native-paper';
import I18n from '../../helpers/i18n';
import * as GFun from '../../helpers/globalFunction';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import NumericInput from 'react-native-numeric-input';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class MenuAmountView extends Component {
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
    let total = this.props.menu.price * this.state.amount;
    if (this.state.status == 'extra') {
      total += 15;
    }

    return total;
  }

  click() {
    this.loadingAddToBasket.showLoading(true);
    setTimeout(() => {
      let menu = this.props.menu;
      this.loadingAddToBasket.showLoading(false);
      this.props.setBasket({
        name: menu.name,
        price: menu.price,
        amount: this.state.amount,
        isExtra: this.state.status == 'extra',
      });
      this.props.modal.current.close();
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
        <View style={{flexDirection: 'row', flex: 0.2}}>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Kanit-Light',
              textAlign: 'left',
            }}>
            {this.props.menu.name}
          </Text>
          <Text
            style={{
              fontSize: 25,
              fontFamily: 'Kanit-Light',
              marginLeft: 'auto',
            }}>
            {this.props.menu.price.toFixed(2)}
          </Text>
        </View>

        <View style={{flexDirection: 'row', flex: 0.2}}>
          <Text
            style={{
              fontSize: 20,
              fontFamily: 'Kanit-Light',
              textAlign: 'left',
            }}>
            {'เพิ่มพิเศษ'}
          </Text>
        </View>

        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({status: 'normal'});
          }}>
          <View style={{flexDirection: 'row', flex: 0.2}}>
            <RadioButton
              value={this.state.status}
              status={this.state.status == 'normal' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({status: 'normal'});
              }}
            />
            <Text
              style={{
                padding: 5,
                fontSize: 18,
                fontFamily: 'Kanit-Light',
                textAlign: 'left',
              }}>
              {'ธรรมดา'}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Kanit-Light',
                marginLeft: 'auto',
              }}>
              {'+ 0.00'}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback
          onPress={() => {
            this.setState({status: 'extra'});
          }}>
          <View style={{flexDirection: 'row', flex: 0.2}}>
            <RadioButton
              value={this.state.status}
              status={this.state.status == 'extra' ? 'checked' : 'unchecked'}
              onPress={() => {
                this.setState({status: 'extra'});
              }}
            />
            <Text
              style={{
                padding: 5,
                fontSize: 18,
                fontFamily: 'Kanit-Light',
                textAlign: 'left',
              }}>
              {'พิเศษ'}
            </Text>

            <Text
              style={{
                fontSize: 18,
                fontFamily: 'Kanit-Light',
                marginLeft: 'auto',
              }}>
              {`+ ${(15).toFixed(2)}`}
            </Text>
          </View>
        </TouchableWithoutFeedback>

        <View
          style={{
            paddingTop: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <NumericInput
            rounded
            value={this.state.amount}
            minValue={1}
            totalWidth={GFun.wp(40)}
            totalHeight={GFun.hp(4)}
            iconStyle={{color: 'white'}}
            rightButtonBackgroundColor="#03DAC6"
            leftButtonBackgroundColor="#03DAC6"
            onChange={value => {
              this.setState({amount: value});
            }}
          />
        </View>

        <View style={{flex: 1, paddingBottom: 25, justifyContent: 'flex-end'}}>
          <AnimateLoadingButton
            ref={c => (this.loadingAddToBasket = c)}
            width={width - 35}
            height={50}
            titleFontFamily={'Kanit-Light'}
            title={I18n.t('button.addToBasket', {
              totalPrice: this.sumPrice().toFixed(2),
            })}
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
  setBasket,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuAmountView);
