const mongoose = require('mongoose');


const dataSchema = new mongoose.Schema({
  team: String,
  gamesPlayed: Number,
  win: Number,
  draw: Number,
  loss: Number,
  goalsFor: Number,
  goalsAgainst: Number,
  points: Number
});


const RecordModel = mongoose.model('Record', dataSchema);


export default RecordModel;
