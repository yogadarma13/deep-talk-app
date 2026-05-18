import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/action';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_NEW_THREAD: 'ADD_NEW_THREAD',
  UP_VOTE_THREAD_ITEM: 'UP_VOTE_THREAD_ITEM',
  DOWN_VOTE_THREAD_ITEM: 'DOWN_VOTE_THREAD_ITEM',
  CLEAR_VOTE_THREAD_ITEM: 'CLEAR_VOTE_THREAD_ITEM'
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

function upVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.UP_VOTE_THREAD_ITEM,
    payload: {
      userId,
      threadId
    },
  };
}

function downVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_ITEM,
    payload: {
      userId,
      threadId
    },
  };
}

function clearVoteThreadActionCreator(userId, threadId) {
  return {
    type: ActionType.CLEAR_VOTE_THREAD_ITEM,
    payload: {
      userId,
      threadId
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

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const thread = threads.find((thread) => thread.id === threadId);
    const isUserIdExistUpVote =  thread.upVotesBy.includes(authUser.id);
    const isUserIdExistDownVote =  thread.downVotesBy.includes(authUser.id);

    if (isUserIdExistUpVote) {
      dispatch(clearVoteThreadActionCreator(authUser.id, threadId));
    } else {
      dispatch(upVoteThreadActionCreator(authUser.id, threadId));
    }

    try {
      if (isUserIdExistUpVote) {
        await api.clearVoteThread(threadId);
      } else {
        await api.upVoteThread(threadId);
      }
    } catch (error) {
      if (isUserIdExistUpVote) {
        dispatch(upVoteThreadActionCreator(authUser.id, threadId));
      } else if (isUserIdExistDownVote) {
        dispatch(downVoteThreadActionCreator(authUser.id, threadId));
      } else {
        dispatch(clearVoteThreadActionCreator(authUser.id, threadId));
      }
      alert(error.message);
    }
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    const thread = threads.find((thread) => thread.id === threadId);
    const isUserIdExistDownVote =  thread.downVotesBy.includes(authUser.id);
    const isUserIdExistUpVote =  thread.upVotesBy.includes(authUser.id);

    if (isUserIdExistDownVote) {
      dispatch(clearVoteThreadActionCreator(authUser.id, threadId));
    } else {
      dispatch(downVoteThreadActionCreator(authUser.id, threadId));
    }

    try {
      if (isUserIdExistDownVote) {
        await api.clearVoteThread(threadId);
      } else {
        await api.downVoteThread(threadId);
      }
    } catch (error) {
      if (isUserIdExistDownVote) {
        dispatch(downVoteThreadActionCreator(authUser.id, threadId));
      } else if (isUserIdExistUpVote) {
        dispatch(upVoteThreadActionCreator(authUser.id, threadId));
      } else {
        dispatch(clearVoteThreadActionCreator(authUser.id, threadId));
      }
      alert(error.message);
    }
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncAddNewThread,
  asyncUpVoteThread,
  asyncDownVoteThread
};
