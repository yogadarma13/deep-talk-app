import { ActionType } from './action';

function authUserReducer(users = [], action = {}) {
  switch (action.type) {
  case ActionType.SET_AUTH_USER:
    return action.payload.authUser;
  default:
    return users;
  }
}

export default authUserReducer;
