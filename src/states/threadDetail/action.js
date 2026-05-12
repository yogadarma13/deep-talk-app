import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
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

function upVoteThreadActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD,
    payload: {
      userId,
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

function asyncAddNewComment(content) {
  return async (dispatch, getState) => {
    try {
      const { threadDetail } = getState();
      const id = threadDetail.id;
      const comment = await api.addNewComment({ id, content });
      dispatch(addNewCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncUpVoteThread(id) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(upVoteThreadActionCreator(authUser.id));

    try {
      await api.upVoteThread(id);
    } catch (error) {
      alert(error.message);
    }
  };
}

export { ActionType, asyncReceiveThreadDetail, asyncAddNewComment, asyncUpVoteThread };
