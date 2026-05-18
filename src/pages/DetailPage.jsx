import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncAddNewComment,
  asyncDownVoteComment,
  asyncDownVoteThread,
  asyncReceiveThreadDetail,
  asyncUpVoteComment,
  asyncUpVoteThread,
} from '../states/threadDetail/action';
import { useParams } from 'react-router-dom';
import CommentInput from '../components/CommentInput';
import DetailItem from '../components/DetailItem';
import CommentList from '../components/CommentList';
import Loading from '../components/Loading';

function DetailPage() {
  const { id } = useParams();
  const { threadDetail = null, authUser = null, isLoading = false } = useSelector((states) => states);
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

  const downVoteComment = (commentId) => {
    dispatch(asyncDownVoteComment(commentId));
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="detail-page__main">
      <DetailItem
        userId={authUser.id}
        ownerName={threadDetail.owner.name}
        ownerAvatar={threadDetail.owner.avatar}
        handleUpVote={upVoteThread}
        handleDownVote={downVoteThread}
        {...threadDetail}
      />
      <CommentInput handleAddComment={onAddComment} />
      {threadDetail.comments.length > 0 ? (
        <CommentList
          userId={authUser.id}
          comments={threadDetail.comments}
          upVoteComment={upVoteComment}
          downVoteComment={downVoteComment}
        />
      ) : null}
    </div>
  );
}

export default DetailPage;
