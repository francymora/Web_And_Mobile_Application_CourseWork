import React, { useState } from 'react';
import axios from 'axios';
import '../style/AddDataForm.css'



function AddDataForm() {
  let url = "http://localhost:3000/";
  const [state, setState] = useState({
    Team: '',
    "Games Played" : '',
    Win: '',
    Draw: '',
    Loss: '',
    "Goals For": '',
    "Goals Against": '',
    Points: '',
    Year: ''
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const teamdata = {
      Team: state.Team,
      "Games Played": state.GamesPlayed,
      Win: state.Win,
      Draw: state.Draw,
      Loss: state.Loss,
      "Goals For": state.GoalsFor,
      "Goals Against": state.GoalsAgainst,
      Points: state.Points,
      Year: state.Year
    }

    axios.post(url + "addData", teamdata)
      .then(res => console.log(res.data));
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Add a Team</h3>
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
  );
}

export default AddDataForm;
