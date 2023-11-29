import React, { useState } from 'react';
import axios from 'axios';

const AddDataForm = () => {
  const [formData, setFormData] = useState({
    Team: '',
    GamesPlayed: '',
    Win: '',
    Draw: '',
    Loss: '',
    GoalsFor: '',
    GoalsAgainst: '',
    Points: '',
    Year: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/addData', formData);
      console.log('Data added successfully:', response.data);
      // Potresti aggiungere logica per gestire la risposta qui (ad esempio, un messaggio di successo)
    } catch (error) {
      console.error('Error adding data:', error);
      // Puoi gestire l'errore qui (ad esempio, mostrare un messaggio di errore all'utente)
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Team:
        <input type="text" name="Team" value={formData.Team} onChange={handleChange} />
      </label>
      <label>
        Games Played:
        <input type="text" name="GamesPlayed" value={formData.GamesPlayed} onChange={handleChange} />
        </label>
        <label>
        Win:
        <input type="text" name="Win" value={formData.Win} onChange={handleChange} />
      </label>
      <label>
        Draw:
        <input type="text" name="Draw" value={formData.Draw} onChange={handleChange} />
      </label>
      <label>
        Loss:
        <input type="text" name="Loss" value={formData.Loss} onChange={handleChange} />
      </label>
      <label>
      Goals For:
        <input type="text" name="GoalsForam" value={formData.GoalsFor} onChange={handleChange} />
      </label>
      <label>
      Goals Against:
        <input type="text" name="GoalsAgainst" value={formData.GoalsAgainst} onChange={handleChange} />
      </label>
      <label>
      Points:
        <input type="text" name="Points" value={formData.Points} onChange={handleChange} />
      </label>
      <label>
      Year:
        <input type="text" name="Year" value={formData.Year} onChange={handleChange} />
      </label>


      
      <button type="submit">Add Data</button>
    </form>
  );
};

export default AddDataForm;
