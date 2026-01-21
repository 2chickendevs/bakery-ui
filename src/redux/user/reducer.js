import * as actionTypes from './types';

const INITIAL_STATE = {
  id: undefined,
  username: undefined,
  firstName: undefined,
  lastName: undefined,
  avatarUrl: undefined,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.USER_INFO_RETRIEVE_SUCCESS:
      return {
        id: action.payload.id,
        username: action.payload.username,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        avatarUrl: action.payload.avatarUrl,
      };
    default:
      return state;
  }
};

export default userReducer;
