import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  CLEAR_VOTE_THREAD: 'CLEAR_VOTE_THREAD',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
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

function downVoteThreadActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function clearVoteThreadActionCreator(userId) {
  return {
    type: ActionType.CLEAR_VOTE_THREAD,
    payload: {
      userId,
    },
  };
}

function upVoteCommentActionCreator(userId, commentId) {
  return {
    type: ActionType.UP_VOTE_COMMENT,
    payload: {
      userId,
      commentId
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

function asyncUpVoteThread() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const isUserIdExistUpVote = threadDetail.upVotesBy.includes(authUser.id);
    const isUserIdExistDownVote = threadDetail.downVotesBy.includes(authUser.id,);

    if (isUserIdExistUpVote) {
      dispatch(clearVoteThreadActionCreator(authUser.id));
    } else {
      dispatch(upVoteThreadActionCreator(authUser.id));
    }

    try {
      if (isUserIdExistUpVote) {
        await api.clearVoteThread(threadDetail.id);
      } else {
        await api.upVoteThread(threadDetail.id);
      }
    } catch (error) {
      if (isUserIdExistUpVote) {
        dispatch(upVoteThreadActionCreator(authUser.id));
      } else if (isUserIdExistDownVote) {
        dispatch(downVoteThreadActionCreator(authUser.id));
      } else {
        dispatch(clearVoteThreadActionCreator(authUser.id));
      }
      alert(error.message);
    }
  };
}

function asyncDownVoteThread() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const isUserIdExistDownVote = threadDetail.downVotesBy.includes(authUser.id,);
    const isUserIdExistUpVote = threadDetail.upVotesBy.includes(authUser.id);

    if (isUserIdExistDownVote) {
      dispatch(clearVoteThreadActionCreator(authUser.id));
    } else {
      dispatch(downVoteThreadActionCreator(authUser.id));
    }

    try {
      if (isUserIdExistDownVote) {
        await api.clearVoteThread(threadDetail.id);
      } else {
        await api.downVoteThread(threadDetail.id);
      }
    } catch (error) {
      if (isUserIdExistDownVote) {
        dispatch(downVoteThreadActionCreator(authUser.id));
      } else if (isUserIdExistUpVote) {
        dispatch(upVoteThreadActionCreator(authUser.id));
      } else {
        dispatch(clearVoteThreadActionCreator(authUser.id));
      }
      alert(error.message);
    }
  };
}

function asyncUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const threadId = threadDetail.id;
    dispatch(upVoteCommentActionCreator(authUser.id, commentId));
    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  ActionType,
  asyncReceiveThreadDetail,
  asyncAddNewComment,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncUpVoteComment
};
