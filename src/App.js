import React,{Component} from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import TeamsDisplay from './Front-End/Display.js';
import DeleteTeams from './Front-End/DeleteForm.js'
import TeamUpdate from './Front-End/UpdateForm.js'
import TeamInformation from './Front-End/TeamStats.js';
import TeamGreaterThan from './Front-End/WonGreaterThan.js';
import TeamAvgGoal from './Front-End/AvgGoals.js';
import NavBar from './Components/NavBar.js';
import AddDataForm from './Front-End/AddDataForm.js';

export default function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<TeamsDisplay />} />
        <Route path='/updateData/:id' element={<TeamUpdate />} />
        <Route path='/deleteData/:id' element={<DeleteTeams />} />
        <Route path='/TeamStats' element={<TeamInformation />} /> 
        <Route path='/WonGreaterThan' element={<TeamGreaterThan />} />
        <Route path='/AverageGoals' element={<TeamAvgGoal />} />
        <Route path='/AddData' element={<AddDataForm />} />
      </Routes>
    </Router>
  );
}