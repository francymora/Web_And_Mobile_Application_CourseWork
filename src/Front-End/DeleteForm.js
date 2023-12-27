import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams} from "react-router-dom";


function DeleteTeams () {
    const [teamData, setTeamData] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const teamId = useParams();
    const url = "http://localhost:3000//foundteam/"+teamId
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
        axios.delete(`http://localhost:3000/deleteTeam/${teamId}`)
          .then(response => {
            console.log('Team deleted successfully');
            // Puoi fare qualcosa qui dopo aver eliminato il team, ad esempio navigare altrove o aggiornare l'interfaccia utente
          })
          .catch(error => {
            console.error('Error deleting team:', error);
          });
    
        setShowConfirmation(false); // Chiudi la conferma di eliminazione
      };
}