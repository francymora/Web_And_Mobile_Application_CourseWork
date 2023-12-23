import mongoose from 'mongoose';



const footballSchema = new mongoose.Schema({
  Team: String,
  "Games Played": Number,
  Win: Number,
  Draw: Number,
  Loss: Number,
  "Goals For": Number,
  "Goals Against": Number,
  Points: Number,
  Year: Number
}, {collection: 'Football'});

const FootballModel = mongoose.model('Football', footballSchema);
export {FootballModel}


