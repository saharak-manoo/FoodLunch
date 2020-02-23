import {BASKET} from '../actions/constants';

const initialState = {
  menus: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case BASKET:
      return {
        ...state,
        menus: [...state.menus, action.payload],
      };

    default:
      return state;
  }
};
