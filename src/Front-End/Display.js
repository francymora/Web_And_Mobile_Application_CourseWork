import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayTeams from "../Components/DisplayTeams.js";
import { Link } from "react-router-dom";

function TeamsDisplay() {
    const [Teams, setTeams] = useState([]);

    const url = "http://localhost:3000/allteams/"

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
    return (
      
        <div className="container">
          <div className="mt-3">
          <table className="table table-stripped" style={{ marginTop: '10px', borderCollapse: 'collapse', width: '100%', border: '1px solid #ddd' }}>
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
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {Teams.map((team, index) => (
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
                    
                    <td>
                      <Link to={"/updateData/" + team._id}>Edit</Link>
                    </td>
                    <td>
                      <Link to={"/deleteData/" + team._id}>Delete</Link>
                    </td>
                    
                    
                  </tr>
                  
                ))}
              </tbody>
            </table>
          </div>
                  
        </div>
        
        
      
      );
      
}

export default TeamsDisplay;
