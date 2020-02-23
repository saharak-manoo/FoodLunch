import {
  UNREAD_MESSAGES_COUNT,
  UNREAD_NOTIFICATIONS_COUNT,
  RESET,
  DARK_MODE,
  POSITION,
} from '../actions/constants';
import * as Api from './api';
import {Platform} from 'react-native';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder-reborn';

export const resetRedux = () => ({
  type: RESET,
});

export const resetReduxNow = () => {
  return dispatch => {
    dispatch(resetRedux());
  };
};

export const darkMode = payload => ({
  type: DARK_MODE,
  payload,
});

export const setDarkMode = isOpen => {
  return dispatch => {
    dispatch(darkMode(isOpen));
  };
};

export const language = payload => ({
  type: LANGUAGE,
  payload,
});

export const setLanguage = locale => {
  return dispatch => {
    dispatch(setLanguage(locale));
  };
};

export const setUnreadMsgCount = payload => ({
  type: UNREAD_MESSAGES_COUNT,
  payload,
});

export const setUnreadNotiCount = payload => ({
  type: UNREAD_NOTIFICATIONS_COUNT,
  payload,
});

export const setScreenBadgeNow = (msgCount, notiCount) => {
  return dispatch => {
    dispatch(setUnreadMsgCount(msgCount));
    dispatch(setUnreadNotiCount(notiCount));
    if (Platform.OS === 'ios') {
      PushNotificationIOS.setApplicationIconBadgeNumber(
        msgCount + notiCount || 0,
      );
    }
  };
};

export const setScreenBadge = token => {
  return dispatch => {
    Api.getUnreadCount(token).then(
      resp => {
        if (resp.success) {
          dispatch(
            setScreenBadgeNow(
              resp.unread_messages_count,
              resp.unread_notifications_count,
            ),
          );
        }
      },
      e => {
        dispatch(setScreenBadgeNow(0, 0));
      },
    );
  };
};

export const setPosition = payload => ({
  type: POSITION,
  payload,
});

export const setPositionNow = () => {
  return dispatch => {
    Geolocation.getCurrentPosition(info => {
      let {latitude, longitude} = info.coords;
      Geocoder.geocodePosition({
        lat: latitude,
        lng: longitude,
      })
        .then(currentAddress => {
          for (address of currentAddress) {
            if (address.subAdminArea) {
              dispatch(
                setPosition({
                  latitude: latitude,
                  longitude: longitude,
                  feature: address.feature,
                  district: address.subAdminArea,
                  adminArea: address.adminArea,
                  country: address.country,
                  formattedAddress: address.formattedAddress,
                  loading: false,
                  location: true,
                }),
              );
            } else if (address.subLocality) {
              dispatch(
                setPosition({
                  latitude: latitude,
                  longitude: longitude,
                  feature: address.feature,
                  district: address.subLocality,
                  adminArea: address.adminArea,
                  country: address.country,
                  formattedAddress: address.formattedAddress,
                  loading: false,
                  location: true,
                }),
              );
            }
          }
        })
        .catch(err =>
          dispatch(
            setPosition({
              latitude: null,
              longitude: null,
              district: '',
              adminArea: '',
              country: '',
              loading: false,
              location: true,
            }),
          ),
        );
    });
  };
};
