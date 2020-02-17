import AsyncStorage from '@react-native-community/async-storage';
import * as GFun from '../../helpers/globalFunction';

const HOSTS = [
  'https://family-plan.herokuapp.com',
  'http://172.20.10.12:3000',
  'http://10.251.1.204:3000',
  'http://192.168.1.37:3000',
  'http://172.20.10.12:3000',
  'http://192.168.2.105:3000',
];

const HOST = HOSTS[0];
const REFRESH_TOKEN = '/api/v1/sessions/refresh_token';
const UNREAD_COUNT = '/api/v1/notifications/unread_count';

function joinUrl(host, path) {
  if (host.endsWith('/')) {
    if (path.startsWith('/')) {
      path = path.slice(1);
    }
  } else {
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
  }
  return host + path;
}

export async function refreshToken() {
  try {
    let user = await GFun.user();
    const resp = await fetch(joinUrl(HOST, REFRESH_TOKEN), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({refresh_token: user.refresh_token}),
    });

    let response = await resp.json();
    await AsyncStorage.setItem('user', JSON.stringify(response.user));

    return response.user.authentication_jwt;
  } catch (e) {
    console.warn(e);
  }
}

export async function checkTokenExpire(resp) {
  let data = {};
  if (resp.status === 401) {
    data = {
      newTokenJwt: await this.refreshToken(),
      status: 'reload',
    };

    return data;
  } else {
    data = {
      newTokenJwt: null,
      status: 'ok',
    };

    return data;
  }
}

export async function getUnreadCount(token) {
  try {
    const resp = await fetch(joinUrl(HOST, UNREAD_COUNT), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    let {status, newTokenJwt} = await this.checkTokenExpire(resp);
    if (status === 'reload') {
      return await this.getUnreadCount(newTokenJwt);
    } else if (status === 'ok') {
      let response = await resp.json();
      return response;
    }
  } catch (e) {
    console.warn(e);
  }
}
