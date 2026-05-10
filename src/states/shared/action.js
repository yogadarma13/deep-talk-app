import api from '../../utils/api';
import { receiveThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateThreadsAndUsers() {
  return async (dispatch) => {
    try {
      const threads = await api.getAllThreads();
      const users = await api.getAllUsers();

      dispatch(receiveThreadsActionCreator(threads));
      dispatch(receiveUsersActionCreator(users));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { asyncPopulateThreadsAndUsers };