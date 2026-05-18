import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';
import Loading from '../components/Loading';

function LeaderboardsPage() {
  const { leaderboards, isLoading } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="leaderboard-page__main">
      <div className="leaderboard-card">
        <h1 className="leaderboard-title">
          Leaderboards
        </h1>

        <div className="leaderboard-list">
          {leaderboards.map((item, index) => (
            <LeaderboardItem
              key={item.user.id}
              rank={index + 1}
              name={item.user.name}
              score={item.score}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default LeaderboardsPage;
