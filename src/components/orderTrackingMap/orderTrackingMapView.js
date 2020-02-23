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
import {ListItem, Icon, Header} from 'react-native-elements';
import TouchableScale from 'react-native-touchable-scale';
import LinearGradient from 'react-native-linear-gradient';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from '../../helpers/styles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_IOS = Platform.OS === 'ios';

class OrderTrackingMapView extends Component {
  constructor(props) {
    super(props);
    let params = this.props.navigation.state.params;
    this.state = {
      search: '',
      isDarkMode: props.setting.isDarkMode,
      region: {},
      order: null,
      spinner: false,
    };
  }

  async componentDidMount() {
    this.setState({
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
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
          backgroundColor: '#FFF',
        }}>
        <StatusBar hidden={true} />
        <View style={{flex: 1}}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex: 1, height: height, width: width}}
            region={this.state.region}
          />
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
  setScreenBadge,
  setScreenBadgeNow,
  setDarkMode,
  setLanguage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderTrackingMapView);
