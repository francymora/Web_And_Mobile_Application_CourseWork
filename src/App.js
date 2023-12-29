import React,{Component} from 'react'
import { BrowserRouter as Router,Routes,Route,Link } from 'react-router-dom';
import TeamsDisplay from './Front-End/Display.js';
import DeleteTeams from './Front-End/DeleteForm.js'
import TeamUpdate from './Front-End/UpdateForm.js'

export default function App() {
  return (
    <Router>
      <h3>Online Teams List</h3>
      <Routes>
        <Route path='/' element={<TeamsDisplay />} />
        <Route path='/updateData/:id' element={<TeamUpdate />} />
        <Route path='/deleteData/:id' element={<DeleteTeams />} />
      </Routes>
    </Router>
  );
}