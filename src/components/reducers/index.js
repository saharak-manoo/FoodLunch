import {combineReducers} from 'redux';
import screenBadge from './screenBadge';
import setting from './setting';
import localtion from './localtion';
import basket from './basket';

export default combineReducers({screenBadge, setting, localtion, basket});
