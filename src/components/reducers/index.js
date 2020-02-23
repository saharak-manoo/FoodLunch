import {combineReducers} from 'redux';
import screenBadge from './screenBadge';
import setting from './setting';
import localtion from './localtion';

export default combineReducers({screenBadge, setting, localtion});
