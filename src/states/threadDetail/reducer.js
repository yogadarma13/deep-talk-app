import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.ADD_NEW_COMMENT:
    return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;