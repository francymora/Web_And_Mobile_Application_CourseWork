import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TeamSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchSearchResults() {
      try {
        const response = await axios.get(`http://localhost:3001/teams?search=${searchTerm}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }

    if (searchTerm) {
      fetchSearchResults();
    } else {
      setSearchResults([]); // Reset results if search term is empty
    }
  }, [searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search team..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Total Games Played</th>
            <th>Wins</th>
            <th>Draw</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((team) => (
            <tr key={team.id}>
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
  );
}

export default TeamSearch;
