import AsyncStorage from '@react-native-community/async-storage';
import {Dimensions, PixelRatio} from 'react-native';
import {showMessage, hideMessage} from 'react-native-flash-message';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export async function user() {
  return JSON.parse(await AsyncStorage.getItem('user'));
}

export function successMessage(message, description) {
  showMessage({
    message: message,
    description: description,
    type: 'default',
    backgroundColor: '#03DAC6',
    color: '#FFF',
    duration: 3000,
  });
}

export function errorMessage(message, description) {
  showMessage({
    message: message,
    description: description,
    type: 'default',
    backgroundColor: '#F60645',
    color: '#FFF',
    duration: 3000,
  });
}

export function infoMessage(message, description) {
  showMessage({
    message: message,
    description: description,
    type: 'default',
    backgroundColor: '#006FF6',
    color: '#FFF',
    duration: 3000,
  });
}

export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '')
    .replace(/\./g, '');
}

export function validateEmail(email) {
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return reg.test(email) === false && email !== '';
}

export function validatePhoneNumber(phoneNumber) {
  return phoneNumber.length < 10 && phoneNumber !== '';
}

export function validatePasswordLessThanSix(password) {
  return password.length < 6 && password !== '';
}

export function validatePasswordMatch(password, confirmPassword) {
  return password !== confirmPassword && confirmPassword !== '';
}

export function validateBlank(value) {
  return value === '';
}

export function strToDate(dateStr) {
  let date = dateStr.split('/');
  let day = date[1];
  let month = date[0];
  let year = date[2];
  return new Date(day + '/' + month + '/' + year) || new Date();
}

export function dateToStr(date) {
  let month = date.getMonth() + 1;
  return date.getDate() + '/' + month + '/' + date.getFullYear();
}

export function uniq(datas) {
  return Array.from(new Set(datas));
}

export function unique(arr, comp) {
  let unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
}

export function sortByDate(datas, asc = false) {
  datas = unique(datas, 'id');

  return datas.sort(function compare(a, b) {
    let dateA = new Date(a.created_at);
    let dateB = new Date(b.created_at);

    return asc ? dateA - dateB : dateB - dateA;
  });
}

export const wp = widthPercent => {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);

  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
};

export const hp = heightPercent => {
  const elemHeight =
    typeof heightPercent === 'number'
      ? heightPercent
      : parseFloat(heightPercent);

  return PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100);
};

export function setAppBadgeCountIos(count = 0) {
  if (Platform.OS === 'ios') {
    PushNotificationIOS.setApplicationIconBadgeNumber(count);
  }
}
