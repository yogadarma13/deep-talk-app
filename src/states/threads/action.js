import api from '../../utils/api';

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
    try {
      const thread = await api.addNewThread({ title, body, category });
      dispatch(addNewThreadActionCreator(thread));
      alert('Berhasil menambahkan thread');
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, receiveThreadsActionCreator, asyncAddNewThread };
