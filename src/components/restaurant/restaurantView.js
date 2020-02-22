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
  SafeAreaView,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {
  setScreenBadge,
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
} from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar, Text, Searchbar} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import I18n from '../../helpers/i18n';
import * as Api from '../actions/api';
import * as GFun from '../../helpers/globalFunction';
import {AppleHeader} from '@freakycoder/react-native-header-view';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../helpers/styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';
const restaurants = [
  {
    name: 'ชุดรวมสแน็ค‬',
    photo: 'https://www.finwer.com/uploads/images/image_750x_5c63ece42f760.jpg',
    shop: 'KFC',
  },
  {
    name: 'เบอร์เกอร์',
    photo:
      'https://d8xxy3dl0iwm6.cloudfront.net/wp-content/uploads/2019/10/open_mcdonaldPlantbased1.jpg',
    shop: 'McDonald’s',
  },
  {
    name: 'พิซซ่าซูเปอร์ชีส',
    photo:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/p960x960/76198291_10157281093153884_2024780594176589824_o.jpg?_nc_cat=1&_nc_ohc=4KP65r_MDGoAQl8mLO9LCSgni3aN8ha1oEa-Q_zDOYFaX86GyIDX-eSvA&_nc_ht=scontent.fbkk2-8.fna&oh=ab682c55adfa37e85c946657ad424726&oe=5E8C31EC',
    shop: 'The Pizza Company',
  },
];

class RestaurantView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isDarkMode: props.setting.isDarkMode,
      spinner: false,
    };
  }

  appHerder() {
    return (
      <View>
        <AppleHeader
          largeTitle={'Home'}
          largeTitleStyle={{
            fontFamily: 'Kanit-Light',
            fontSize: 44,
            fontWeight: 'bold',
          }}
          dateTitle={'Maejo university'}
          dateTitleStyle={{fontFamily: 'Kanit-Light'}}
          imageSource={{
            uri: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          }}
        />
      </View>
    );
  }

  listRecommendedRestaurant = restaurants => {
    return (
      <FlatList
        style={{flex: 1, paddingTop: 10}}
        data={restaurants}
        horizontal={true}
        scrollEnabled={!this.state.spinner}
        showsHorizontalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                fontFamily: 'Kanit-Light',
                flex: 0.7,
                backgroundColor: this.state.isDarkMode ? '#363636' : '#FFF',
                margin: GFun.hp(1),
                borderRadius: 20,
                width: GFun.wp(33.3),
                height: GFun.hp(21),
              }}
              onPress={() => {
                this.props.navigation.navigate('Menu', {
                  restaurant: item,
                });
              }}>
              <View style={{flex: 1}}>
                <Image
                  style={{
                    width: GFun.wp(33.3),
                    height: GFun.hp(14),
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                  source={{
                    uri: item.photo,
                  }}
                />
                <View style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.8, justifyContent: 'flex-start'}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          alignContent: 'flex-start',
                          fontFamily: 'Kanit-Light',
                          fontSize: 12,
                          alignSelf: 'flex-start',
                          paddingTop: GFun.hp(0.5),
                          paddingLeft: GFun.hp(1),
                        }}>
                        {item.name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: 'Kanit-Light',
                          fontSize: 8,
                          alignSelf: 'flex-start',
                          paddingTop: GFun.hp(0.5),
                          paddingLeft: GFun.hp(1),
                        }}>
                        {item.shop}
                      </Text>
                    </View>

                    <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: 'Kanit-Light',
                          fontSize: 8,
                          alignSelf: 'flex-end',
                          paddingBottom: GFun.hp(1),
                          paddingRight: GFun.hp(1),
                        }}>
                        {I18n.t('text.price', {price: 200})}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item}
      />
    );
  };

  listRestaurant = restaurants => {
    return (
      <FlatList
        style={{flex: 1, paddingTop: 10}}
        data={restaurants}
        horizontal={false}
        scrollEnabled={!this.state.spinner}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                fontFamily: 'Kanit-Light',
                flex: 0.7,
                backgroundColor: this.state.isDarkMode ? '#363636' : '#FFF',
                margin: GFun.hp(1),
                borderRadius: 20,
                width: GFun.wp(90),
                height: GFun.hp(30),
              }}
              onPress={() => {
                this.props.navigation.navigate('Menu', {
                  restaurant: item,
                });
              }}>
              <View style={{flex: 1}}>
                <Image
                  style={{
                    width: GFun.wp(90),
                    height: GFun.hp(22),
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                  }}
                  source={{
                    uri: item.photo,
                  }}
                />
                <View style={{flex: 1}}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 0.5, justifyContent: 'flex-start'}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          alignContent: 'flex-start',
                          fontFamily: 'Kanit-Light',
                          fontSize: 20,
                          alignSelf: 'flex-start',
                          paddingTop: GFun.hp(1),
                          paddingLeft: GFun.hp(2),
                        }}>
                        {item.name}
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: 'Kanit-Light',
                          fontSize: 15,
                          alignSelf: 'flex-start',
                          paddingTop: GFun.hp(0.5),
                          paddingLeft: GFun.hp(2),
                        }}>
                        {item.shop}
                      </Text>
                    </View>

                    <View style={{flex: 0.5, justifyContent: 'flex-end'}}>
                      <Text
                        numberOfLines={1}
                        style={{
                          fontFamily: 'Kanit-Light',
                          fontSize: 15,
                          alignSelf: 'flex-end',
                          paddingBottom: GFun.hp(2),
                          paddingRight: GFun.hp(2),
                        }}>
                        {I18n.t('text.price', {price: 200})}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item}
      />
    );
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: this.props.setting.appColor,
        }}>
        {this.appHerder()}
        <View style={{flex: 0.7, padding: 10}}>
          <View style={styles.listCard}>
            <Text style={styles.textCardList}>
              {I18n.t('placeholder.recommendedMenu')}
            </Text>
          </View>
          {this.listRecommendedRestaurant(restaurants)}
        </View>

        <View style={{flex: 1, padding: 10}}>
          <View style={styles.listCard}>
            <Text style={styles.textCardList}>
              {I18n.t('placeholder.allMenu')}
            </Text>
          </View>
          {this.listRestaurant(restaurants)}
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  screenBadge: state.screenBadge,
  setting: state.setting,
});

const mapDispatchToProps = {
  setScreenBadge,
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
};

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantView);
