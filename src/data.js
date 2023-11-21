import mongoose from 'mongoose';
import express from 'express';
const app = express();


const footballSchema = new mongoose.Schema({
  Team: String,
  GamesPlayed: Number,
  Win: Number,
  Draw: Number,
  Loss: Number,
  GoalsFor: Number,
  GoalsAgainst: Number,
  Points: Number,
  Year: Number
}, {collection: 'Football'});

const FootballModel = mongoose.model('Football', footballSchema);
export {FootballModel}


// Assicurati che la connessione a MongoDB sia stabilita prima di eseguire le operazioni sul database
/*
// Esempio: Connessione a MongoDB
mongoose.connect('mongodb://localhost:27017/Web_Application_Coursework')
.then(() => {
  console.log('Connessione al database MongoDB riuscita');

  // Esempio di query per ottenere tutti i documenti dalla collezione "Football"
  FootballModel.find({Team: 'Argentina'})
    .then(results => {
      console.log('Risultati della query:', results);
    })
    .catch(error => {
      console.error('Errore nella query:', error);
    });
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
*/