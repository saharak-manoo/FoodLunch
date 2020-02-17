import {DARK_MODE, LANGUAGE} from '../actions/constants';
import RNLanguages from 'react-native-languages';

const initialState = {
  theme: 'light',
  isDarkMode: false,
  appColor: '#EEEEEE',
  locale: RNLanguages.language,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DARK_MODE:
      return {
        ...state,
        isDarkMode: action.payload,
        theme: action.payload ? 'dark' : 'light',
        appColor: action.payload ? '#202020' : '#EEEEEE',
      };

    case LANGUAGE:
      return {...state, locale: action.payload};

    default:
      return state;
  }
};
