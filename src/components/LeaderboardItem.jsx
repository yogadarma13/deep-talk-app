import React from 'react';

function LeaderboardItem({ rank, name, score }) {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-left">
        <div className="leaderboard-rank">#{rank}</div>
        <h3 className="leaderboard-name">{name}</h3>
      </div>

      <div className="leaderboard-score">{score}</div>
    </div>
  );
}

export default LeaderboardItem;
