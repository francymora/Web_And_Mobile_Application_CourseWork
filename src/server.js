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
app.post('/updateData/:id', async (req, res) => {
  const { Team, GamesPlayed, Win, Draw, Loss, GoalsFor, GoalsAgainst, Points, Year } = req.body;

  try {
    const updateResult = await FootballModel.findOneAndUpdate({_id:req.params.id},{Team:Team,"Games Played":GamesPlayed,Win:Win,Draw:Draw,Loss:Loss,"Goals For": GoalsFor,"Goal Against":GoalsAgainst, Points:Points,Year:Year}).exec();
    console.log("Document Update: ", updateResult);
    res.status(200).json({ message: 'Document Update successfully', updateResult });
  } catch (error) {
    console.error('Error updationg document:', error);
    res.status(500).json({ message: 'Error uploading document', error: error.message });
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

app.get('/totalStats/:year/:teamName', async (req, res) => {
  try{
    const team = await FootballModel.find({Year: parseInt(req.params.year),Team:req.params.teamName}).exec();
    res.json(team)
    }catch (err) {
      console.error('Errore durante la ricerca delle squadre:', err);
      res.status(500).send('Team not found');
    }
  
  });

  app.get('/teamNames', async (req, res) => {
    try {
      const teamNames = await FootballModel.distinct('Team').exec();
      res.json(teamNames);
    } catch (err) {
      console.error('Errore durante la ricerca dei nomi delle squadre:', err);
      res.status(500).send('Errore nel recupero dei nomi delle squadre');
    }
  });

  
  


  

app.get('/teamsWonGreaterThan/:win', async (req, res) => {
  try{
    const team = await FootballModel.find({Win:{$gte:parseInt(req.params.win)}}).limit(10).exec();

    res.json(team)
    }catch (err) {
      console.error('Errore durante la ricerca delle squadre:', err);
      res.status(500).send('Team not found');
    }
  

  
});



app.get('/avgGoals/:year/:averageGoals', async (req, res) => {
  const year = parseInt(req.params.year);
  const averageGoals = parseFloat(req.params.averageGoals);

  try {
    const teams = await FootballModel.aggregate([
      { $match: { Year: year } },
      { $addFields: { avgGoals: { $divide: ["$Goals For", "$Games Played"] } } },
      { $match: { avgGoals: { $gte: averageGoals } } }
    ]);

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
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