import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";


function DeleteTeams () {
    const [teamData, setTeamData] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const teamId = useParams();
    const url = "http://localhost:3000//foundteam/"+teamId
    const deleteUrl = 'http://localhost:3000/deleteData/"+teamId'
    useEffect(() => {
        axios.get(url)
          .then(response => {
            setTeamData(response.data);
          })
          .catch(error => {
            console.error('Error fetching team details:', error);
          });
      }, [teamId]);
      const handleDeleteConfirmation = () => {
        setShowConfirmation(true);
      };
      const handleDelete = () => {
        axios.delete(deleteUrl)
          .then(response => {
            console.log('Team deleted successfully');
            // Puoi fare qualcosa qui dopo aver eliminato il team, ad esempio navigare altrove o aggiornare l'interfaccia utente
          })
          .catch(error => {
            console.error('Error deleting team:', error);
          });
    
        setShowConfirmation(false); // Chiudi la conferma di eliminazione
      };
      return (
        <div>
          {teamData ? (
            <div>
              <h3>{teamData.Team}</h3>
              <h3>{teamData["Games Played"]}</h3>
              <h3>{teamData.Win}</h3>
              <h3>{teamData.Draw}</h3>
              <h3>{teamData.Loss}</h3>
              <h3>{teamData["Goals For"]}</h3>
              <h3>{teamData["Goals Against"]}</h3>
              <h3>{teamData.Points}</h3>
              <h3>{teamData.Year}</h3>

              
              
              <button onClick={handleDeleteConfirmation}>Delete</button>
              
              {showConfirmation && (
                <div>
                  <p>Are you sure you want to delete this team?</p>
                  <button onClick={handleDelete}>Yes</button>
                  <button onClick={() => setShowConfirmation(false)}>No</button>
                </div>
              )}
              {deleted && (
                 <p>Team deleted successfully!</p>
                )}
            </div>
          ) : (
            
            null
          )}
        </div>
      );
}