// Leaderboard.js

import React, { useState, useEffect } from 'react';
import LanguageAPI from './LanguageAPI';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await LanguageAPI.getLeaderboardData();
        setLeaderboardData(response.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboardData();
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4">Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Marks</th>
            <th scope="col">Total Marks</th>
            <th scope="col">Last Graded Time</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.username}</td>
              <td>{entry.marks}</td>
              <td>{entry.total_marks}</td>
              <td>{new Date(entry.last_graded_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
