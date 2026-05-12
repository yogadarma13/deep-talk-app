import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function addNewCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_NEW_COMMENT,
    payload: {
      comment,
    },
  };
}

function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    try {
      const threadDetail = await api.getThreadDetail(id);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddNewComment({ id, content }) {
  return async (dispatch) => {
    try {
      const comment = await api.addNewComment({ id, content });
      dispatch(addNewCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, asyncReceiveThreadDetail, asyncAddNewComment };
