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
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from '../../helpers/styles';
import {Modalize} from 'react-native-modalize';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class OrderTrackingMapView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      isDarkMode: props.setting.isDarkMode,
      region: {},
      order: null,
      spinner: false,
      markers: [],
    };
  }

  async componentDidMount() {
    await this.props.setPositionNow();
    this.setState({
      region: {
        latitude: this.props.localtion.latitude,
        longitude: this.props.localtion.longitude,
        latitudeDelta: 0.0022432,
        longitudeDelta: 0.0022432,
      },
    });

    this.setState({
      markers: [
        {
          coordinate: {
            latitude: this.props.localtion.latitude,
            longitude: this.props.localtion.longitude,
          },
          title: this.props.localtion.district,
          description: this.props.localtion.formattedAddress,
          pin: {
            uri:
              'https://scontent.fbkk22-3.fna.fbcdn.net/v/t1.0-9/43037168_484675825344022_2145394713346179072_n.jpg?_nc_cat=110&_nc_eui2=AeFN4DXU_HA8U1ZQWmY4b13PqWGoRXrWsrKZTnTPNY0rGGpE0tlWFTGa3KyGoG3ZtDOnrzb7gq753OgrIJtNS2WIw2vS1gGovYSh9gtqtWDVBA&_nc_ohc=hFP-wRSqSSQAX9K4I2H&_nc_ht=scontent.fbkk22-3.fna&oh=acd1e584738300f1fbddd9bfeefd875b&oe=5EB629AE',
          },
        },
        {
          coordinate: {
            latitude: 18.8870633,
            longitude: 99.0088528,
          },
          title: 'หมูทอดหน้าตั้ง',
          description: 'ร้านอาหาร',
          pin: require('../../images/shop.png'),
        },
        {
          coordinate: {
            latitude: 18.8867483,
            longitude: 99.0088084,
          },
          title: "Sakarak's",
          description: 'พนักงานส่งอาหาร',
          pin: require('../../images/car.jpg'),
        },
      ],
    });
  }

  onRegionChange(region) {
    this.setState({region: region});
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          backgroundColor: 'transparent',
        }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            flex: 1,
            height: height,
            width: width,
          }}
          region={this.state.region}>
          {this.state.markers.map(marker => (
            <Marker
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}>
              <Image
                style={{
                  height: 45,
                  width: 45,
                  borderRadius: 30,
                }}
                source={marker.pin}
              />
            </Marker>
          ))}
        </MapView>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTrackingMapView);
