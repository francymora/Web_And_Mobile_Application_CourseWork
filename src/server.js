
import express from 'express';
import mongoose from 'mongoose';
import { RecordModel } from './data.js';

const app = express();
mongoose.connect('mongodb://localhost:27017/Web_Apllication_Coursework');

const dbConnection = mongoose.connection;

dbConnection.on('error', (error) => console.error('Errore di connessione al database:', error));

// Evento per gestire la connessione riuscita
dbConnection.once('open', () => console.log('Connessione al database avvenuta con successo'));
const port = 5002

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//const RecordModel = require('./dataschema');

async function retrieveTeams() {
  try {
    const teams = await RecordModel.find({}, 'win');
    console.log('Nomi delle squadre nel database:', teams);
    // Puoi fare qualcosa con i nomi delle squadre recuperate qui
  } catch (error) {
    console.error('Errore durante il recupero dei nomi delle squadre:', error);
  }
}

retrieveTeams();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
