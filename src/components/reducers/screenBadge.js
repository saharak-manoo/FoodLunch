import {
  UNREAD_MESSAGES_COUNT,
  UNREAD_NOTIFICATIONS_COUNT,
  RESET,
} from '../actions/constants';

const initialState = {
  unreadMessagesCount: 0,
  unreadNotificationsCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UNREAD_MESSAGES_COUNT:
      return {...state, unreadMessagesCount: action.payload};

    case UNREAD_NOTIFICATIONS_COUNT:
      return {...state, unreadNotificationsCount: action.payload};

    case RESET:
      return initialState;

    default:
      return state;
  }
};
