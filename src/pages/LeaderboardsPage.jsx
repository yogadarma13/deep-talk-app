import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboards } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <table className="table-main">
      <thead>
        <tr>
          <th>Peringkat</th>
          <th>Nama</th>
          <th>Nilai</th>
        </tr>
      </thead>
      <tbody>
        {leaderboards.map((item, index) => (
          <tr key={item.user.id}>
            <td>{index + 1}</td>
            <td>{item.user.name}</td>
            <td>{item.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderboardsPage;
