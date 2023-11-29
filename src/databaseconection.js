import mongoose from 'mongoose';

const DatabaseConnection = () => {
    mongoose.connect('mongodb://localhost:27017/Web_Application_Coursework').then(() => {
  console.log('Connessione al database MongoDB riuscita');
})
.catch((error) => {
  console.error('Errore di connessione al database:', error);
});
}

export {DatabaseConnection}