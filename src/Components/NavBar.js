import { Navbar, Nav, Container } from 'react-bootstrap';
import React from 'react';
import '../style/NavBarStyles.css'; // Assicurati che il percorso del file CSS sia corretto

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar">
      <Container>
       
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="nav-link" href='/'>Team List</Nav.Link>
            <Nav.Link className="nav-link" href="/addData">Add a Team</Nav.Link>
            <Nav.Link className="nav-link" href='/TeamStats'>Match Team Stats</Nav.Link>
            <Nav.Link className="nav-link" href='/WonGreaterThan'>Team Win Stats</Nav.Link>
            <Nav.Link className="nav-link" href='/AverageGoals'>Team average Goal</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
