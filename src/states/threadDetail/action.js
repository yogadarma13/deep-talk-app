import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_NEW_COMMENT: 'ADD_NEW_COMMENT',
  UP_VOTE_THREAD: 'UP_VOTE_THREAD',
  DOWN_VOTE_THREAD: 'DOWN_VOTE_THREAD',
  CLEAR_VOTE_THREAD: 'CLEAR_VOTE_THREAD',
  UP_VOTE_COMMENT: 'UP_VOTE_COMMENT',
  DOWN_VOTE_COMMENT: 'DOWN_VOTE_COMMENT',
  CLEAR_VOTE_COMMENT: 'CLEAR_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
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

function downVoteCommentActionCreator(userId, commentId) {
  return {
    type: ActionType.DOWN_VOTE_COMMENT,
    payload: {
      userId,
      commentId
    },
  };
}

function clearVoteCommentActionCreator(userId, commentId) {
  return {
    type: ActionType.CLEAR_VOTE_COMMENT,
    payload: {
      userId,
      commentId
    },
  };
}

function asyncReceiveThreadDetail(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());
    try {
      const threadDetail = await api.getThreadDetail(id);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncAddNewComment(content) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    try {
      const { threadDetail } = getState();
      const id = threadDetail.id;
      const comment = await api.addNewComment({ id, content });
      dispatch(addNewCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVoteThread() {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const isUserIdExistUpVote = threadDetail.upVotesBy.includes(authUser.id);
    const isUserIdExistDownVote = threadDetail.downVotesBy.includes(authUser.id);

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
    const isUserIdExistDownVote = threadDetail.downVotesBy.includes(authUser.id);
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
    const isUserIdExistUpVote = threadDetail.comments.find((comment) => comment.id === commentId).upVotesBy.includes(authUser.id);
    const isUserIdExistDownVote = threadDetail.comments.find((comment) => comment.id === commentId).downVotesBy.includes(authUser.id);

    if (isUserIdExistUpVote) {
      dispatch(clearVoteCommentActionCreator(authUser.id, commentId));
    } else {
      dispatch(upVoteCommentActionCreator(authUser.id, commentId));
    }

    try {
      if (isUserIdExistUpVote) {
        await api.clearVoteComment({ threadId, commentId });
      } else {
        await api.upVoteComment({ threadId, commentId });
      }
    } catch (error) {
      if (isUserIdExistUpVote) {
        dispatch(upVoteCommentActionCreator(authUser.id, commentId));
      } else if (isUserIdExistDownVote) {
        dispatch(downVoteCommentActionCreator(authUser.id, commentId));
      } else {
        dispatch(clearVoteCommentActionCreator(authUser.id, commentId));
      }
      alert(error.message);
    }
  };
}

function asyncDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();
    const threadId = threadDetail.id;
    const isUserIdExistDownVote = threadDetail.comments.find((comment) => comment.id === commentId).downVotesBy.includes(authUser.id);
    const isUserIdExistUpVote = threadDetail.comments.find((comment) => comment.id === commentId).upVotesBy.includes(authUser.id);

    if (isUserIdExistDownVote) {
      dispatch(clearVoteCommentActionCreator(authUser.id, commentId));
    } else {
      dispatch(downVoteCommentActionCreator(authUser.id, commentId));
    }

    try {
      if (isUserIdExistDownVote) {
        await api.clearVoteComment({ threadId, commentId });
      } else {
        await api.downVoteComment({ threadId, commentId });
      }
    } catch (error) {
      if (isUserIdExistDownVote) {
        dispatch(downVoteCommentActionCreator(authUser.id, commentId));
      } else if (isUserIdExistUpVote) {
        dispatch(upVoteCommentActionCreator(authUser.id, commentId));
      } else {
        dispatch(clearVoteCommentActionCreator(authUser.id, commentId));
      }
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  addNewCommentActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  clearVoteThreadActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  clearVoteCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncAddNewComment,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncUpVoteComment,
  asyncDownVoteComment
};
