import React, { useState } from 'react';
import axios from 'axios';

function AddDataForm()  {
  let url = "http://localhost:3000/"
  const [state, setState] = useState({
    Team: '',
    GamesPlayed: '',
    Win: '',
    Draw: '',
    Loss: '',
    GoalsFor: '',
    GoalsAgainst: '',
    Points: '',
    Year: '2023'
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name] : value,
    });
  };

  const onSubmit=(e) => {
    e.preventDefaut();
    const teamdata = {
      Team:state.Team,
      "Games Played":state.GamesPlayed,
      Win:state.Win,
      Draw:state.Draw,
      Loss:state.Loss,
      "Goals For":state.GoalsFor,
      "Goals Against":state.GoalsAgainst,
      Points:state.Points,
      Year:state.Year
    }

    axios.post(url+"addData",teamdata)
    .then(res => console.log(res.data));
  }



};

  return (
    <div style={{marginTop: 10}}>
      <h3>Add a Team</h3>
      <form onSubmit={onSubmit} method='Post'>
        <div className='form-group'>
          <label>Team Name: </label>
          <input className='form-control' type='text' name='Team' value={state.Team} onChange={handleChange}/>
          
        </div>
        <div className='form-group'>
          <label>Games Played</label>
          <input className='form-control' name="Games Played" type="number" value={state.GamesPlayed} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Win</label>
          <input className='form-control' name="Win Played" type="number" value={state.Win} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Draw</label>
          <input className='form-control' name="Draw" type="number" value={state.Draw} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Loss</label>
          <input className='form-control' name="Loss" type="number" value={state.Loss} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Goals For</label>
          <input className='form-control' name="Goals For" type="number" value={state.GoalsFor} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Goals Against</label>
          <input className='form-control' name="Goals Against" type="number" value={state.GoalsAgainst} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Points</label>
          <input className='form-control' name="Points" type="number" value={state.Points} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <label>Years between (1990 and 2024)</label>
          <input className='form-control' name="Year" type="range" min = '1990' max='2024' value={state.Year} onChange={handleChange}/>

        </div>
        <div className='form-group'>
          <center>
            <input type='submit' value="Add the new Team" className='btn btn-primary'/>
            
          </center>

        </div>


      </form>

    </div>
);


export default AddDataForm;
