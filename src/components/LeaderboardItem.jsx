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

export default LeaderboardItem;
