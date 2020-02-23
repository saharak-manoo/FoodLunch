import {POSITION} from '../actions/constants';

const initialState = {
  latitude: null,
  longitude: null,
  feature: null,
  district: null,
  adminArea: null,
  country: null,
  formattedAddress: null,
  loading: false,
  location: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POSITION:
      return {
        ...state,
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
        feature: action.payload.feature,
        district: action.payload.district,
        adminArea: action.payload.adminArea,
        country: action.payload.country,
        formattedAddress: action.payload.formattedAddress,
        loading: false,
        location: true,
      };

    default:
      return state;
  }
};
