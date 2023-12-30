import React, { useState, useEffect } from "react";
import axios from "axios";
import '../style/GeneralStyle.css'

function TeamInformation() {
  const [teams, setTeams] = useState([]);
  const [year, setYear] = useState("");
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
    axios.get(`http://localhost:3000/totalStats/${year}/${teamName}`)
    
      .then(response => {
        setTeamData(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error("Error fetching team data:", error);
      });
  };

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleTeamNameChange = (event) => {
    const selectedTeamName = event.target.value;
    setTeamName(selectedTeamName); // Aggiornamento dello stato teamName
  };

  return (
    <div calss='TeamStats'>
      <h2>Team Information</h2>
      <div>
        <label>
          Year:
        <input className='Input-Box-TeamStats' type="number" value={year} onChange={handleYearChange} />
        </label>

        <label>
          Team Name:
          <select value={teamName} onChange={handleTeamNameChange}>
            <option value="">Select The Country</option>
            {teams.map((team, index) => (
              <option key={index} value={team}>
                {team}
              </option>
            ))}
          </select>
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
             
                  </tr>
                  
                ))}
              </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TeamInformation;
