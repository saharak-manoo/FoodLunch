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

  centerScreen: {
    fontFamily: 'Kanit-Light',
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignContent: 'center',
  },

  textHead: {
    fontFamily: 'Kanit-Light',
    fontSize: 45,
    paddingBottom: 10,
  },

  textSub: {
    fontFamily: 'Kanit-Light',
    fontSize: 25,
    paddingBottom: 20,
    color: '#666666',
  },

  borderBase: {
    color: '#000',
    width: 30,
    height: 45,
  },

  borderHighLighted: {
    color: '#000',
    borderColor: '#03DAC6',
  },

  underlineBase: {
    color: '#000',
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 2,
  },

  underlineHighLighted: {
    color: '#000',
    borderColor: '#03DAC6',
  },

  resendOTP: {
    fontFamily: 'Kanit-Light',
    fontSize: 20,
    paddingTop: 90,
    paddingBottom: 20,
    color: '#666666',
  },

  listCard: {
    fontFamily: 'Kanit-Light',
    height: 40,
    borderLeftColor: '#03DAC6',
    borderLeftWidth: 3,
  },

  textCardList: {
    fontFamily: 'Kanit-Light',
    paddingLeft: 15,
    fontSize: 25,
    fontWeight: 'bold',
  },

  titleContainer: {
    fontFamily: 'Kanit-Light',
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageTitle: {
    fontFamily: 'Kanit-Light',
    color: 'white',
    backgroundColor: 'transparent',
    fontSize: 44,
  },

  image: {
    height: 300,
    width: width,
    alignSelf: 'stretch',
    resizeMode: 'cover',
  },
});
