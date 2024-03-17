import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../CSS/Navbar.css'
import { NavLink } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavSecondary({count}) {

    const navigate = useNavigate()

    function logoutHandler(){
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <Navbar expand="lg" id="Navbar" className="bg-body-tertiary" >
      <Container>
        <Navbar.Brand href="#home" id="brand">
          Shop
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to='/home'>
              <b>Home</b>
            </Nav.Link>
            <Nav.Link as={NavLink} to='/orders'>
              <b>Orders</b>
            </Nav.Link>

            <Button variant="outline-dark" style={{marginLeft: '15px'}} onClick={logoutHandler}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavSecondary;