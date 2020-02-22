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
} from '../actions';
import AsyncStorage from '@react-native-community/async-storage';
import {Appbar, Text, Searchbar} from 'react-native-paper';
import ActionButton from 'react-native-action-button';
import I18n from '../../helpers/i18n';
import * as Api from '../actions/api';
import * as GFun from '../../helpers/globalFunction';
import {
  AppleHeader,
  ModernHeader,
  ClassicHeader,
} from '@freakycoder/react-native-header-view';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {ListItem} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from '../../helpers/styles';
import {Icon} from 'react-native-elements';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

const menus = [
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
  {
    name: 'ชุดรวมสแน็ค‬',
    photo: 'https://www.finwer.com/uploads/images/image_750x_5c63ece42f760.jpg',
    shop: 'KFC',
  },
];

class MenuView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNavTitle: false,
      search: '',
      isDarkMode: props.setting.isDarkMode,
      spinner: false,
    };
  }

  appHerderFixed() {
    return (
      <Appbar.Header
        style={{
          backgroundColor: this.state.showNavTitle ? '#FFF' : 'transparent',
        }}>
        <Appbar.BackAction
          onPress={() => this.props.navigation.goBack()}
          style={{
            backgroundColor: this.state.showNavTitle ? 'transparent' : '#FFF',
          }}
        />
        <Appbar.Content
          title={'KFC'}
          color={this.state.showNavTitle ? '#000' : 'transparent'}
        />
        <Appbar.Action
          icon="magnify"
          style={{
            backgroundColor: this.state.showNavTitle ? 'transparent' : '#FFF',
          }}
        />
      </Appbar.Header>
    );
  }

  appHerderImage() {
    return (
      <HeaderImageScrollView
        fadeOutForeground
        maxHeight={GFun.hp(45)}
        minHeight={GFun.hp(10)}
        renderHeader={() => (
          <ImageBackground
            source={{
              url:
                'https://www.finwer.com/uploads/images/image_750x_5c63ece42f760.jpg',
            }}
            style={([styles.image], {height: GFun.hp(45)})}
          />
        )}
        renderFixedForeground={() =>
          this.state.showNavTitle ? (
            <Animatable.View animation="slideInDown">
              {this.appHerderFixed()}
            </Animatable.View>
          ) : null
        }
        renderForeground={() => (
          <View style={styles.titleContainer}>
            <Text style={styles.imageTitle}>{'KFC'}</Text>
          </View>
        )}>
        <View style={{flex: 1, height: height / 1.1, padding: 20}}>
          <TriggeringView
            bottomOffset={-40}
            onBeginDisplayed={() => this.setState({showNavTitle: false})}
            onBeginHidden={() =>
              this.setState({showNavTitle: true})
            }></TriggeringView>
          <View style={styles.listCard}>
            <Text style={styles.textCardList}>
              {I18n.t('placeholder.allMenu')}
            </Text>
          </View>
          {this.listRestaurant(menus)}
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
            <ListItem
              Component={TouchableScale}
              friction={90}
              tension={100}
              activeScale={0.95}
              title={item.name}
              subtitle={item.subtitle}
              leftAvatar={{rounded: false, source: {uri: item.photo}}}
              rightTitle={200}
              rightTitleStyle={{fontWeight: 'bold', color: '#000'}}
            />
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
          backgroundColor: '#FFF',
        }}>
        <StatusBar
          hidden={!this.state.showNavTitle}
          barStyle={'dark-content'}
        />
        {this.appHerderImage()}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuView);
