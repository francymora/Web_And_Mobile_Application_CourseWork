import express from 'express';
import mongoose from 'mongoose';
import { FootballModel } from './data.js';

const app = express();
const port = 5002;

// Connessione al database MongoDB
mongoose.connect('mongodb://localhost:27017/Web_Application_Coursework').then(() => {
  console.log('Connessione al database MongoDB riuscita');
})
.catch((error) => {
  console.error('Errore di connessione al database:', error);
});
app.get('/football', async (req, res) => {
  try {
    const allFootballData = await FootballModel.find({}); // Query per ottenere tutti i documenti
    res.json(allFootballData); // Invia i dati come JSON in risposta alla richiesta GET su /football
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).json({ error: 'Errore nel recuperare i dati' }); // Invia un errore HTTP 500 in caso di errore
  }
});
app.get('/argentina', async (req, res) => {
  try {
    const allFootballData = await FootballModel.find({Team: 'Argentina'}); // Query per ottenere tutti i documenti
    res.json(allFootballData); // Invia i dati come JSON in risposta alla richiesta GET su /football
  } catch (error) {
    console.error('Errore nella query:', error);
    res.status(500).json({ error: 'Errore nel recuperare i dati' }); // Invia un errore HTTP 500 in caso di errore
  }
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
console.log("hi")
console.log("Manish")