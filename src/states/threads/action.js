import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_NEW_THREAD: 'ADD_NEW_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addNewThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_NEW_THREAD,
    payload: {
      thread,
    },
  };
}

function asyncAddNewThread({ title, body, category, navigate }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.addNewThread({ title, body, category });
      dispatch(addNewThreadActionCreator(thread));
      alert('Thread added successfully');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, receiveThreadsActionCreator, asyncAddNewThread };
