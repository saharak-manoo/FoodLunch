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
import {Appbar, Text, Searchbar} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import I18n from '../../helpers/i18n';
import * as Api from '../actions/api';
import * as GFun from '../../helpers/globalFunction';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {ListItem, Icon, Header} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../helpers/styles';
import {Modalize} from 'react-native-modalize';

// View
import OrderTrackingMapView from '../modal/orderTrackingMapView';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class MenuView extends Component {
  constructor(props) {
    super(props);
    let params = this.props.navigation.state.params;
    this.state = {
      showNavTitle: false,
      search: '',
      isDarkMode: props.setting.isDarkMode,
      restaurant: params.restaurant,
      spinner: false,
    };
  }

  async componentDidMount() {
    await this.props.setPositionNow();
  }

  orderTrackingMapModal = React.createRef();

  appHerderFixed() {
    return (
      <Animatable.View
        animation={this.state.showNavTitle ? 'fadeIn' : 'fadeInDown'}>
        <Appbar.Header
          style={{
            backgroundColor: this.state.showNavTitle ? '#FFF' : 'transparent',
            zIndex: 1000,
          }}>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: this.state.showNavTitle ? 'transparent' : '#FFF',
            }}
          />
          <Appbar.Content
            title={this.state.restaurant.name}
            color={this.state.showNavTitle ? '#000' : 'transparent'}
          />
          <Appbar.Action
            icon="magnify"
            style={{
              backgroundColor: this.state.showNavTitle ? 'transparent' : '#FFF',
            }}
          />
        </Appbar.Header>
      </Animatable.View>
    );
  }

  appHerderImage() {
    return (
      <HeaderImageScrollView
        maxHeight={GFun.hp(45)}
        minHeight={GFun.hp(10)}
        renderHeader={() => (
          <ImageBackground
            source={{
              url: this.state.restaurant.photo,
            }}
            style={([styles.image], {height: GFun.hp(45)})}
          />
        )}
        renderTouchableFixedForeground={() => this.appHerderFixed()}
        renderForeground={() => (
          <Animatable.View
            animation={this.state.showNavTitle ? 'fadeIn' : 'fadeInDown'}
            style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{this.state.restaurant.name}</Text>
            <View style={styles.deliveryTime}>
              <Text style={styles.deliveryTimeText}>
                {'Delivery time 10 minute.'}
              </Text>
            </View>
          </Animatable.View>
        )}>
        <View
          style={{
            flex: 0.5,
            height: height / 1.095,
            padding: GFun.hp(3),
            paddingTop: GFun.hp(4),
            zIndex: 0,
          }}>
          <TriggeringView
            bottomOffset={-GFun.hp(5)}
            onBeginDisplayed={() => this.setState({showNavTitle: false})}
            onBeginHidden={() =>
              this.setState({showNavTitle: true})
            }></TriggeringView>

          <View style={styles.listCard}>
            <Text style={styles.textCardList}>
              {I18n.t('placeholder.allMenu')}
            </Text>
          </View>
          {this.listRestaurant(this.state.restaurant.menus)}
        </View>
      </HeaderImageScrollView>
    );
  }

  listRestaurant = menus => {
    return (
      <FlatList
        style={{flex: 1, paddingTop: 10}}
        data={menus}
        horizontal={false}
        scrollEnabled={!this.state.spinner}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <Animatable.View
              animation={'slideInUp'}
              delay={index * (index + 150)}>
              <ListItem
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                title={item.name}
                subtitle={item.subtitle}
                leftAvatar={{rounded: false, source: {uri: item.photo}}}
                rightTitle={item.price.toFixed(2)}
                rightTitleStyle={{fontWeight: 'bold', color: '#000'}}
                onPress={this.openOrderTrackingMapModal}
              />
            </Animatable.View>
          );
        }}
        keyExtractor={item => item}
      />
    );
  };

  openOrderTrackingMapModal = () => {
    if (this.orderTrackingMapModal.current) {
      this.orderTrackingMapModal.current.open();
    }
  };

  orderTrackingMapModalView() {
    return (
      <Modalize
        ref={this.orderTrackingMapModal}
        modalStyle={styles.popUpModal}
        overlayStyle={styles.overlayModal}
        handleStyle={styles.handleModal}
        handlePosition="inside"
        openAnimationConfig={{
          timing: {duration: 400},
          spring: {speed: 10, bounciness: 10},
        }}
        closeAnimationConfig={{
          timing: {duration: 400},
          spring: {speed: 10, bounciness: 10},
        }}
        withReactModal
        adjustToContentHeight>
        <OrderTrackingMapView
          modal={this.orderTrackingMapModal}
          isDarkMode={this.state.isDarkMode}
        />
      </Modalize>
    );
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFF',
        }}>
        <StatusBar
          hidden={!this.state.showNavTitle}
          barStyle={'dark-content'}
        />
        {this.appHerderImage()}
        {this.orderTrackingMapModalView()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  screenBadge: state.screenBadge,
  setting: state.setting,
  localtion: state.localtion,
});

const mapDispatchToProps = {
  setScreenBadge,
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
  setPositionNow,
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);
