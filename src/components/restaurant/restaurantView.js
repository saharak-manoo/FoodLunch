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
  setPositionNow,
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
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';
import * as Animatable from 'react-native-animatable';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';
const restaurants = [
  {
    name: 'KFC',
    photo: 'https://www.finwer.com/uploads/images/image_750x_5c63ece42f760.jpg',
    deliveryCost: 10,
    menus: [
      {
        name: 'ชุดรวมสแน็ค‬',
        price: 199.0,
        photo:
          'https://www.finwer.com/uploads/images/image_750x_5c63ece42f760.jpg',
      },
      {
        name: 'ไก่ทอด + วิงซ์แซ่บ 3 ชิ้น',
        price: 49.0,
        photo:
          'https://www.thpromotion.com/wp-content/uploads/2019/10/KFC-%E0%B9%80%E0%B8%84%E0%B9%80%E0%B8%AD%E0%B8%9F%E0%B8%8B%E0%B8%B5-%E0%B9%82%E0%B8%9B%E0%B8%A3%E0%B9%82%E0%B8%A1%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99-3-%E0%B8%8A%E0%B8%B4%E0%B9%89%E0%B8%99-49-%E0%B8%9A%E0%B8%B2%E0%B8%97.jpg',
      },
    ],
  },
  {
    name: 'McDonald’s',
    photo:
      'https://d8xxy3dl0iwm6.cloudfront.net/wp-content/uploads/2019/10/open_mcdonaldPlantbased1.jpg',
    deliveryCost: 15,
    menus: [
      {
        name: 'เบอร์เกอร์ไก่',
        price: 89.0,
        photo:
          'https://d8xxy3dl0iwm6.cloudfront.net/wp-content/uploads/2019/10/open_mcdonaldPlantbased1.jpg',
      },
    ],
  },
  {
    name: 'The Pizza Company',
    photo:
      'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/p960x960/76198291_10157281093153884_2024780594176589824_o.jpg?_nc_cat=1&_nc_ohc=4KP65r_MDGoAQl8mLO9LCSgni3aN8ha1oEa-Q_zDOYFaX86GyIDX-eSvA&_nc_ht=scontent.fbkk2-8.fna&oh=ab682c55adfa37e85c946657ad424726&oe=5E8C31EC',
    deliveryCost: 50,
    menus: [
      {
        name: 'พิซซ่าซูเปอร์ชีส',
        price: 299.0,
        photo:
          'https://scontent.fbkk2-8.fna.fbcdn.net/v/t1.0-9/p960x960/76198291_10157281093153884_2024780594176589824_o.jpg?_nc_cat=1&_nc_ohc=4KP65r_MDGoAQl8mLO9LCSgni3aN8ha1oEa-Q_zDOYFaX86GyIDX-eSvA&_nc_ht=scontent.fbkk2-8.fna&oh=ab682c55adfa37e85c946657ad424726&oe=5E8C31EC',
      },
    ],
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

  async componentDidMount() {
    await this.props.setPositionNow();
  }

  appHerder() {
    return (
      <View>
        <AppleHeader
          largeTitle={"Welcome Saharak's"}
          largeTitleStyle={{
            fontFamily: 'Kanit-Light',
            fontSize: 30,
            fontWeight: 'bold',
          }}
          dateTitle={
            this.props.localtion.district == null
              ? 'Loading...'
              : this.props.localtion.district
          }
          dateTitleStyle={{fontFamily: 'Kanit-Light'}}
          imageSource={{
            uri:
              'https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.0-9/43037168_484675825344022_2145394713346179072_n.jpg?_nc_cat=110&_nc_eui2=AeFN4DXU_HA8U1ZQWmY4b13PqWGoRXrWsrKZTnTPNY0rGGpE0tlWFTGa3KyGoG3ZtDOnrzb7gq753OgrIJtNS2WIw2vS1gGovYSh9gtqtWDVBA&_nc_ohc=hFP-wRSqSSQAX9K4I2H&_nc_ht=scontent.fbkk22-3.fna&oh=acd1e584738300f1fbddd9bfeefd875b&oe=5EB629AE',
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
              onPress={() => {
                this.props.navigation.navigate('Menu', {
                  restaurant: item,
                });
              }}>
              <Animatable.View
                delay={index * (index + 100)}
                animation={'slideInRight'}
                style={{
                  flex: 1,
                  backgroundColor: this.state.isDarkMode ? '#363636' : '#FFF',
                  fontFamily: 'Kanit-Light',
                  margin: GFun.hp(1),
                  borderRadius: 20,
                  width: GFun.wp(33.3),
                  height: GFun.hp(21),
                }}>
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
                        {I18n.t('text.deliveryCost', {
                          deliveryCost: item.deliveryCost,
                        })}
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
              </Animatable.View>
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
              onPress={() => {
                this.props.navigation.navigate('Menu', {
                  restaurant: item,
                });
              }}>
              <Animatable.View
                animation={'slideInUp'}
                delay={index * (index + 150)}
                style={{
                  flex: 1,
                  fontFamily: 'Kanit-Light',
                  backgroundColor: this.state.isDarkMode ? '#363636' : '#FFF',
                  margin: GFun.hp(1),
                  borderRadius: 20,
                  width: GFun.wp(90),
                  height: GFun.hp(30),
                }}>
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
                        {I18n.t('text.deliveryCost', {
                          deliveryCost: item.deliveryCost,
                        })}
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
              </Animatable.View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item}
      />
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: this.props.setting.appColor,
        }}>
        <SafeAreaView>{this.appHerder()}</SafeAreaView>
        <Searchbar
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            marginTop: 10,
          }}
          placeholder="Search"
          onChangeText={search => {
            this.setState({search: search});
          }}
          value={this.state.search}
        />
        <ScrollView>
          <View style={{flex: 0.55, padding: 10}}>
            <View style={styles.listCard}>
              <Text style={styles.textCardList}>
                {I18n.t('placeholder.recommendedRestaurant')}
              </Text>
            </View>
            {this.listRecommendedRestaurant(restaurants)}
          </View>

          <View style={{flex: 1, padding: 10}}>
            <View style={styles.listCard}>
              <Text style={styles.textCardList}>
                {I18n.t('placeholder.allRestaurant')}
              </Text>
            </View>
            {this.listRestaurant(restaurants)}
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantView);
