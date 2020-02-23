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
  KeyboardAvoidingView,
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
import MenuAmountView from '../modal/menuAmountView';
import OrderTrackingMapView from '../modal/orderTrackingMapView';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class MenuView extends Component {
  constructor(props) {
    super(props);
    let params = this.props.navigation.state.params;
    this.state = {
      search: '',
      isDarkMode: props.setting.isDarkMode,
      restaurant: params.restaurant,
      spinner: false,
      menu: null,
    };
  }

  orderTrackingMapModal = React.createRef();
  menuAmountModal = React.createRef();

  componentWillMount() {
    this.props.setPositionNow();
  }

  appHeaderFixed() {
    return (
      <Animatable.View animation={'fadeIn'}>
        <Appbar.Header
          style={{
            backgroundColor: 'transparent',
          }}>
          <Appbar.BackAction
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: '#FFF',
            }}
          />
        </Appbar.Header>
      </Animatable.View>
    );
  }

  appHeaderSearchBar() {
    return (
      <SafeAreaView style={{padding: 20}}>
        <KeyboardAvoidingView>
          <Searchbar
            style={{marginLeft: 20, marginRight: 20}}
            placeholder="Search"
            onChangeText={search => {
              this.setState({search: search});
            }}
            value={this.state.search}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  appHerderImage() {
    return (
      <HeaderImageScrollView
        minOverlayOpacity={0.5}
        maxOverlayOpacity={0.7}
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
        renderTouchableFixedForeground={() => this.appHeaderFixed()}
        renderForeground={() => (
          <Animatable.View
            animation={this.state.showNavTitle ? 'fadeIn' : 'fadeInDown'}
            style={styles.titleContainer}>
            <Text style={styles.imageTitle} numberOfLines={1}>
              {this.state.restaurant.name}
            </Text>
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
            height: height / 1.33,
            padding: GFun.hp(3),
            paddingTop: GFun.hp(3),
            zIndex: 0,
            backgroundColor: '#EEEEEE',
          }}>
          <TriggeringView bottomOffset={-GFun.hp(20)}></TriggeringView>

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
                containerStyle={{backgroundColor: '#EEEEEE'}}
                Component={TouchableScale}
                friction={90}
                tension={100}
                activeScale={0.95}
                title={item.name}
                subtitle={item.subtitle}
                leftAvatar={{rounded: false, source: {uri: item.photo}}}
                rightTitle={item.price.toFixed(2)}
                rightTitleStyle={{fontWeight: 'bold', color: '#000'}}
                onPress={() => this.openMenuAmountModal(item)}
              />
            </Animatable.View>
          );
        }}
        keyExtractor={item => item}
      />
    );
  };

  openMenuAmountModal = menu => {
    if (this.menuAmountModal.current) {
      this.setState({menu: menu});
      this.menuAmountModal.current.open();
    }
  };

  menuAmountModalView(menu) {
    return (
      <Modalize
        ref={this.menuAmountModal}
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
        <MenuAmountView
          modal={this.menuAmountModal}
          menu={menu}
          isDarkMode={this.state.isDarkMode}
        />
      </Modalize>
    );
  }

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
          backgroundColor: '#EEEEEE',
        }}>
        <StatusBar hidden={true} />
        {this.appHerderImage()}
        {this.orderTrackingMapModalView()}
        {this.menuAmountModalView(this.state.menu)}
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
