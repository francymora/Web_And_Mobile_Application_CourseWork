import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams,useNavigate} from "react-router-dom";
import '../style/DeleteData.css';


function DeleteTeams () {
    const [teamData, setTeamData] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [deleteButtonVisible, setDeleteButtonVisible] = useState(true);
    const [showDeletedMessage, setShowDeletedMessage] = useState(false);
    const {id} = useParams();
    let navigate = useNavigate();
    
    
    useEffect(() => {
        axios
          .get(`http://localhost:3000/foundteam/${id}`)
          .then(res => {
            console.log("retreive", res.data);
            setTeamData(res.data);
          })
          .catch(error => {
            console.error("Error fetching team data:", error);
          });
      }, []);
      const handleDeleteConfirmation = () => {
        setShowConfirmation(true);
      };
      const handleDelete = () => {
        const confirmation = window.confirm("Team deleted!");
        if (confirmation) {
            axios.delete(`http://localhost:3000/deleteData/${id}`).then(() => {
          console.log("Team deleted successfully");
          setDeleted(true);
          setShowDeletedMessage(true);
          navigate("/");
          setShowConfirmation(false);
          setDeleteButtonVisible(false);
          navigate("/")

          // Nasconde il messaggio dopo 5 secondi (5000 millisecondi)
          
        })
      
        
          .catch(error => {
            console.error('Error deleting team:', error);
          });
        }
    
        setShowConfirmation(false);
        setDeleteButtonVisible(false);
        
        
      };
      const handleCancelDelete = () => {
        setShowConfirmation(false);
        navigate("/");
        };
        return (
          <div className="DeleteContainer">
            {teamData ? (
              <div className="TeamInfo">
                <h3>Team: {teamData.Team}</h3>
                <h3>Games Played: {teamData["Games Played"]}</h3>
                <h3>Win: {teamData.Win}</h3>
                <h3>Draw: {teamData.Draw}</h3>
                <h3>Loss: {teamData.Loss}</h3>
                <h3>Goals For: {teamData["Goals For"]}</h3>
                <h3>Goals Against: {teamData["Goals Against"]}</h3>
                <h3>Points: {teamData.Points}</h3>
                <h3>Year: {teamData.Year}</h3>
        
                {deleteButtonVisible && !showConfirmation && (
                  <button onClick={handleDeleteConfirmation}>Delete</button>
                )}
        
                {showConfirmation && (
                  <div className="DeleteConfirmation">
                    <p>Are you sure you want to delete this team?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={handleCancelDelete}>No</button>
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
export default DeleteTeams;