import PropTypes from 'prop-types';
import React from 'react';

function LeaderboardItem({ rank, avatar, name, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-left">
        <div data-testid="rank-leaderboard" className="leaderboard-rank">
          #{rank}
        </div>
        <img
          data-testid="avatar-leaderboard"
          className="leaderboard-avatar"
          src={avatar}
          alt={name}
        />
        <h3 data-testid="name-leaderboard" className="leaderboard-name">
          {name}
        </h3>
      </div>

      <div data-testid="score-leaderboard" className="leaderboard-score">
        {score}
      </div>
    </div>
  );
}

LeaderboardItem.propTypes = {
  /** The rank of Leaderboard */
  rank: PropTypes.number.isRequired,
  /** The avatar of Leaderboard */
  avatar: PropTypes.string.isRequired,
  /** The name of Leaderboard */
  name: PropTypes.string.isRequired,
  /** The score of Leaderboard */
  score: PropTypes.number.isRequired
};

export default LeaderboardItem;
