import React, { useState, useEffect } from "react";
import axios from "axios";

function TeamGreaterThan() {
  const [teams, setTeams] = useState([]);
  const [win, setWin] = useState("");
  const [teamName, setTeamName] = useState(""); // Aggiunta dello stato per teamName
  const [teamData, setTeamData] = useState(null);
  const url = "http://localhost:3000/teamNames"

  useEffect(() => {
    axios.get(url)
    .then(res => {
        setTeams(res.data)
        console.log(res.data)
        
    })
    .catch(err => {
        console.log("error has occuree")
    })
},[])

  const handleTeamSelection = () => {
    axios.get(`http://localhost:3000/teamsWonGreaterThan/${win}`)
    
      .then(response => {
        setTeamData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching team data:", error);
      });
  };

  const handleWinChange = (event) => {
    setWin(event.target.value);
  };

  

  return (
    <div>
      <h2>Team Information</h2>
      <div>
        <label>
          Win:
          <input type="number" value={win} onChange={handleWinChange} />
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

             
                  </tr>
                  
                ))}
              </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamGreaterThan;
