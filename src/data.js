import mongoose from 'mongoose';



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


