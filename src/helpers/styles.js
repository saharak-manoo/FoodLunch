import {Dimensions, StyleSheet, Platform} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const IS_ANDROID = Platform.OS === 'android';

export const styles = StyleSheet.create({
  defaultView: {
    fontFamily: 'Kanit-Light',
    flex: 1,
    backgroundColor: '#EEEEEE',
  },
});
