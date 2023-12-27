import express from 'express';
import mongoose from 'mongoose';
import { FootballModel } from './data.js';
import { DatabaseConnection } from './databaseconection.js';
import cors from 'cors';
import {MongoClient, ObjectId} from 'mongodb'
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())

app.use(express.urlencoded({ extended: true }));

// Connessione al database MongoDB
DatabaseConnection();

app.get('/allteams', cors() ,async function(req, res) {
  try {
    const allTeams = await FootballModel.find().exec();
    res.json(allTeams);
  } catch (err) {
    console.error('Errore durante la ricerca delle squadre:', err);
    res.status(500).send('Errore durante la ricerca delle squadre');
  }
});



app.post('/addData', async (req, res) => {
  
  const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;

  const newTeam = new FootballModel({
  Team:Team, 
  "Games Played":GamesPlayed, 
  Win:Win, 
  Draw:Draw, 
  Loss:Loss, 
  "Goals For":GoalsFor, 
  "Goals Against": GoalsAgainst, 
  Points:Points, 
  Year:Year});

  newTeam.save().then((newTeam) => {
    console.log("New Teams added", newTeam);
  })
  .catch((err) => {
    console.error(err);
  })


});


// POST method per l'aggiornamento di un singolo record per un dato Team
app.post('/updateData:id', async (req, res) => {
  const { Team, FieldToUpdate, NewValue } = req.body;

  try {
    // Trova il record nel database utilizzando il nome del team
    const existingRecord = await FootballModel.findOne({ Team });

    if (!existingRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Aggiorna il campo specificato con il nuovo valore
    existingRecord[FieldToUpdate] = NewValue;

    // Salva le modifiche nel database
    const updatedRecord = await existingRecord.save();
    res.status(200).json({ message: 'Record updated successfully', data: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
});

app.delete('/deleteData/:id', async (req, res) => {
  try {
    const deletionResult = await FootballModel.findByIdAndDelete(req.params.id).exec();
    console.log("Document deleted: ", deletionResult);
    res.status(200).json({ message: 'Document deleted successfully', deletionResult });
  } catch (error) {
    console.error('Error deleting document:', error);
    res.status(500).json({ message: 'Error deleting document', error: error.message });
  }
});

app.get('/totals/:year', async (req, res) => {
  const { year } = req.params; // Ottieni l'anno dai parametri dell'URL

  try {
    // Trova tutti i record corrispondenti all'anno specificato
    const records = await FootballModel.find({ Year: parseInt(year) });

    if (!records || records.length === 0) {
      return res.status(404).json({ message: 'No records found for the given year' });
    }

    // Calcola il totale dei giochi giocati, dei pareggi e delle vittorie per l'anno specificato
    let totalGamesPlayed = 0;
    let totalDraw = 0;
    let totalWin = 0;

    records.forEach((record) => {
      totalGamesPlayed += record.GamesPlayed;
      totalDraw += record.Draw;
      totalWin += record.Win;
    });

    res.status(200).json({
      year: parseInt(year),
      totalGamesPlayed,
      totalDraw,
      totalWin
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching totals', error: error.message });
  }
});
app.post('/teamsWonGreaterThan', async (req, res) => {
  const { winValue } = req.body;

  try {
    const intValue = parseInt(winValue);

    // Esegui la query per trovare le prime 10 squadre in cui il numero di partite "vinte" è maggiore del valore specificato
    const teams = await FootballModel.find({ Win: { $gt: intValue } }).limit(10);

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: 'No teams found with wins greater than the specified value' });
    }

    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error: error.message });
  }
});

app.get('/teamsByAverageGoalsFor/:year', async (req, res) => {
  const { year } = req.params;

  try {
    const intValue = parseInt(year);

    // Esegui la query per trovare tutte le squadre per un dato anno e calcolare la media dei "Goals For"
    const teams = await FootballModel.aggregate([
      {
        $match: { Year: intValue }
      },
      {
        $group: {
          _id: '$Team',
          averageGoalsFor: { $avg: '$GoalsFor' },
          Team: { $first: '$Team' },
          GamesPlayed: { $first: '$GamesPlayed' },
          Win: { $first: '$Win' },
          Draw: { $first: '$Draw' },
          Loss: { $first: '$Loss' },
          GoalsFor: { $first: '$GoalsFor' },
          GoalsAgainst: { $first: '$GoalsAgainst' },
          Points: { $first: '$Points' },
          Year: { $first: '$Year' }
        }
      }
    ]);

    if (!teams || teams.length === 0) {
      return res.status(404).json({ message: 'No teams found for the given year' });
    }

    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching teams', error: error.message });
  }
});

app.get('/foundteam/:id', async (req, res) => {
  try{
  const team = await FootballModel.findById(req.params.id).exec();
  res.json(team)
  }catch (err) {
    console.error('Errore durante la ricerca delle squadre:', err);
    res.status(500).send('Team not found');
  }

});



/*
// Supponiamo che tu abbia già importato il modello FootballModel per interagire con il database

// POST method per l'aggiornamento di un singolo record per un dato Team
app.post('/updateData/:teamName', async (req, res) => {
  const { teamName } = req.params; // Ottieni il nome del team dai parametri dell'URL
  const {
    GamesPlayed,
    Win,
    Draw,
    Loss,
    GoalsFor,
    GoalsAgainst,
    Points,
    Year
  } = req.body; // Ottieni i nuovi valori dai dati inviati nel corpo della richiesta

  try {
    // Cerca il record con il nome del team specificato
    const existingRecord = await FootballModel.findOne({ Team: teamName });

    if (!existingRecord) {
      return res.status(404).json({ message: 'Record not found' });
    }

    // Aggiorna i campi con i nuovi valori
    existingRecord.GamesPlayed = GamesPlayed;
    existingRecord.Win = Win;
    existingRecord.Draw = Draw;
    existingRecord.Loss = Loss;
    existingRecord.GoalsFor = GoalsFor;
    existingRecord.GoalsAgainst = GoalsAgainst;
    existingRecord.Points = Points;
    existingRecord.Year = Year;

    // Salva le modifiche nel database
    const updatedRecord = await existingRecord.save();
    res.status(200).json({ message: 'Record updated successfully', data: updatedRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error updating record', error: error.message });
  }
});




*/






app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
});






/*
to get all the teams (with all nine columns) where the average "Goals For" for a given year entered by the user, we need to query using MongoDB's aggregation function.

In the context of Mongoose and MongoDB, you can use the aggregate() method to perform aggregation operations, such as averaging, grouping, and more.

Here are the steps that should be included in this query:

Filtering by year: You start by filtering documents that match the specified year.
Group by team: Group documents by team, in order to calculate the average "Goals For" for each team.
Calculating the average: Use the $avg aggregation operator to calculate the average "Goals For" for each team.
Data Projection: Return the requested data, including the nine required fields.








*/