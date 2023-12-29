import React,{useEffect,useState} from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";

function TeamUpdate(props){
    const [showUpdateddMessage, setShowUpdatedMessage] = useState(false);
    const [state, setState] = useState({
        Team: "",
        "Games Played": "",
        Win: "",
        Draw: "",
        Loss: "",
        "Goals For": "",
        "Goals Against": "",
        Points: "",
        Year: ""
      });
    
      const {id} = useParams();
      let navigate = useNavigate();
      
    
      useEffect(() => {
        
        axios
          .get(`http://localhost:3000/foundteam/${id}`)
          .then(res => {
            console.log("update", res.data);
            setState(res.data);
          })
          .catch(error => {
            console.error("Error fetching team data:", error);
          });
      }, []);
    
      const handleChange = e => {
        const { name, value } = e.target;
        setState({
          ...state,
          [name]: value
        });
      };
    
      const onSubmit = e => {
        e.preventDefault();
        const teamdata = {
          Team: state.Team,
          "Games Played": state["Games Played"],
          Win: state.Win,
          Draw: state.Draw,
          Loss: state.Loss,
          "Goals For": state["Goals For"],
          "Goals Against": state["Goals Against"],
          Points: state.Points,
          Year: state.Year
        };
        const confirmation = window.confirm("Team updated!");
        if(confirmation)
        {

           axios
          .post(`http://localhost:3000/updateData/${id}`, teamdata)
          .then((res) => {
            console.log(res.data);
            setShowUpdatedMessage(true);
            navigate("/")
            })
          .catch(error => {
            console.error("Error updating team:", error);
          });}
      };
    
    return(
        <div style={{marginTop:10}}>
        <h3>Update Team id: {id}</h3>
        <form onSubmit={onSubmit} method='Post'>
        <div className='form-group'>
          <label>Team Name: </label>
          <input className='form-control' type='text' name='Team' value={state.Team} onChange={handleChange}/>
        </div>
        <div className='form-group'>
          <label>Games Played: </label>
          <input className='form-control' type='text' name='Games Played' value={state.GamesPlayed} onChange={handleChange}/>
        </div>
        <div className='form-group'>
          <label>Win</label>
          <input className='form-control' type="text" name="Win"  value={state.Win} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Draw</label>
          <input className='form-control'  type="text" name="Draw" value={state.Draw} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Loss</label>
          <input className='form-control' type="text" name="Loss"  value={state.Loss} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Goals For</label>
          <input className='form-control' type="text" name="Goals For"  value={state.GoalsFor} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Goals Against</label>
          <input className='form-control' type="text" name="Goals Against"  value={state.GoalsAgainst} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Points</label>
          <input className='form-control' type="text" name="Points"  value={state.Points} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Years between (1990 and 2024)</label>
          <input className='form-control' type= 'text' name="Year"  value={state.Year} onChange={handleChange}/>
        </div>
        <div className='form-group'>
          <center>
            <input type='submit' value="Add the new Team" className='btn btn-primary'/>
          </center> 
        </div>   
        </form>
    </div>
    )


}
export default TeamUpdate;