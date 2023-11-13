import express from 'express';
import mongoose from 'mongoose';
import RecordModel from './dataModel';

const app = express();
const dbConnection = mongoose.connect('mongodb://localhost:27017/Web_Apllication_Coursework');

dbConnection.on('error', (error) => console.error('Errore di connessione al database:', error));
dbConnection.once('open', () => console.log('Connessione al database avvenuta con successo'));

app.listen(5051, () => {
    console.log(`Server in ascolto sulla porta ${port}`);
  });