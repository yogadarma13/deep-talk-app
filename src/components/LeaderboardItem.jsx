import React from 'react';

function LeaderboardItem({ rank, avatar, name, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-left">
        <div className="leaderboard-rank">#{rank}</div>
        <img
          className="leaderboard-avatar"
          src={avatar}
          alt={name}
        />
        <h3 className="leaderboard-name">{name}</h3>
      </div>

      <div className="leaderboard-score">{score}</div>
    </div>
  );
}

export default LeaderboardItem;
