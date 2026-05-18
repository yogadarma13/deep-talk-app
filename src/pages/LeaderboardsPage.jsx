import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';
import LeaderboardItem from '../components/LeaderboardItem';
import Loading from '../components/Loading';

function LeaderboardsPage() {
  const leaderboards = useSelector((state) => state.leaderboards);
  const isLoading = useSelector((state) => state.isLoading);

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
              avatar={item.user.avatar}
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
