import React, { useState, useEffect } from "react";
import axios from "axios";

function TeamAvgGoal() {
  const [teamData, setTeamData] = useState(null);
  const [year, setYear] = useState("");
  const [averageGoals, setAverageGoals] = useState("");

  const handleTeamSelection = () => {
    axios.get(`http://localhost:3000/avgGoals/${year}/${averageGoals}`)
      .then(response => {
        setTeamData(response.data);
      })
      .catch(error => {
        console.error("Error fetching team data:", error);
      });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleAverageGoalsChange = (event) => {
    setAverageGoals(event.target.value);
  };

  return (
    <div>
      <h2>Team Information</h2>
      <div>
        <label>
          Year:
          <input type="number" value={year} onChange={handleYearChange} />
        </label>

        <label>
          Average Goals:
          <input type="number" step="0.01" value={averageGoals} onChange={handleAverageGoalsChange} />
        </label>

        <button onClick={handleTeamSelection}>Get Team Data</button>
      </div>
      {teamData && (
        <div>
          <h3>Team Information</h3>
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Games Played</th>
                <th>Wins</th>
                <th>Draws</th>
                <th>Loss</th>
                <th>Goals For</th>
                <th>Goals Against</th>
                <th>Points</th>
                <th>Year</th>
                <th>Average Goals</th>
              </tr>
            </thead>
            <tbody>
              {teamData.map((team, index) => (
                <tr key={index}>
                  <td>{team.Team}</td>
                  <td>{team["Games Played"]}</td>
                  <td>{team.Win}</td>
                  <td>{team.Draw}</td>
                  <td>{team.Loss}</td>
                  <td>{team["Goals For"]}</td>
                  <td>{team["Goals Against"]}</td>
                  <td>{team.Points}</td>
                  <td>{team.Year}</td>
                  <td>{team.avgGoals.toFixed(2)}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamAvgGoal;
