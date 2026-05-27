import React from 'react';
import { FaRegComments } from 'react-icons/fa6';
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from 'react-icons/bi';
import PropTypes from 'prop-types';

function ActionItems({
  userId,
  totalComments,
  upVotesBy,
  downVotesBy,
  upVoteHandler,
  downVoteHandler,
}) {
  return (
    <div className="action-items">
      <div data-testid="comments-item" className="action-item">
        <FaRegComments className="action-item-comment" />
        {totalComments}
      </div>
      <div data-testid="upVotesBy-item" className="action-item">
        <button data-testid="upVotesBy-button" onClick={upVoteHandler}>
          {upVotesBy.includes(userId) ? (
            <BiSolidLike className="action-item-active" />
          ) : (
            <BiLike />
          )}
        </button>
        {upVotesBy.length}
      </div>

      <div data-testid="downVotesBy-item" className="action-item">
        <button data-testid="downVotesBy-button" onClick={downVoteHandler}>
          {downVotesBy.includes(userId) ? (
            <BiSolidDislike className="action-item-active" />
          ) : (
            <BiDislike />
          )}
        </button>
        {downVotesBy.length}
      </div>
    </div>
  );
}

ActionItems.propTypes = {
  /** User ID for handle Up vote and Down vote comment */
  userId: PropTypes.string.isRequired,
  /** The total commment of item */
  totalComments: PropTypes.number.isRequired,
  /** The list of up vote to show numbers of up vote comment */
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The list of down vote to show numbers of down vote comment */
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  /** The function to handle up vote comment */
  upVoteHandler: PropTypes.func.isRequired,
  /** The function to handle down vote comment */
  downVoteHandler: PropTypes.func.isRequired,
};

export default ActionItems;
