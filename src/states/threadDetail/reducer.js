import { ActionType } from './action';

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.threadDetail;
  case ActionType.ADD_NEW_COMMENT:
    return { ...threadDetail, comments: [action.payload.comment, ...threadDetail.comments] };
  case ActionType.UP_VOTE_THREAD:
    return { ...threadDetail, upVotesBy: [...threadDetail.upVotesBy, action.payload.vote.id], downVotesBy: threadDetail.downVotesBy.filter((id) => id !== action.payload.vote.id) };
  default:
    return threadDetail;
  }
}

export default threadDetailReducer;