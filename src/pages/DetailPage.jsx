import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showFormattedDate } from '../utils';
import CommentItem from '../components/CommentItem';
import {
  asyncAddNewComment,
  asyncDownVoteThread,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThread,
} from '../states/threadDetail/action';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';
import CommentInput from '../components/CommentInput';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [dispatch]);

  if (!threadDetail) {
    return null;
  }

  const onAddComment = (content) => {
    dispatch(asyncAddNewComment(content));
  };

  const upVoteThread = () => {
    dispatch(asyncUpVoteThread());
  };

  const downVoteThread = () => {
    dispatch(asyncDownVoteThread());
  };

  const upVoteComment = (commentId) => {
    dispatch(asyncUpVoteComment(commentId));
  };

  const downVoteComment = (commentId) => {};

  return (
    <div>
      <h1>Detail</h1>
      <h3>{threadDetail.title}</h3>
      <p>{`~ ${threadDetail.owner.name}`}</p>
      <p>{threadDetail.category}</p>
      <p>{showFormattedDate(threadDetail.createdAt)}</p>
      <div>{parser(threadDetail.body)}</div>
      <div className='thread-vote__main'>
        <button onClick={upVoteThread}>
          Like: {threadDetail.upVotesBy.length}
        </button>
        <button onClick={downVoteThread}>
          Unlike: {threadDetail.downVotesBy.length}
        </button>
      </div>

      <h4 className='thread-comment__main'>Comment</h4>
      {threadDetail.comments.map((comment) => (
        <CommentItem
          key={comment.id}
          name={comment.owner.name}
          handleUpVote={() => upVoteComment(comment.id)}
          handleDownVote={() => downVoteComment(comment.id)}
          {...comment}
        />
      ))}

      <CommentInput handleAddComment={onAddComment} />
    </div>
  );
}

export default DetailPage;
