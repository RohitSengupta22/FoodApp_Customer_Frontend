import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../CSS/Navbar.css'
import { NavLink } from 'react-router-dom';
import { FaCartArrowDown } from "react-icons/fa";
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function NavComp({count}) {

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

            <div className="d-flex align-items-center">
              {/* Add a container for the avatar with margin-right */}
             

              {/* Move the cart icon and span into a separate div */}
              <div className="position-relative">
               <NavLink to='/Cart'><FaCartArrowDown /></NavLink> 
                <span
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '10px',
                    textAlign: 'center',
                    fontSize: '12px',
                    position: 'absolute',
                    right: '-9px', 
                    top: '-8px', 
                  }}
                >
                  {count}
                </span>
               
              </div>

             
            </div>

            <Button variant="outline-dark" style={{marginLeft: '15px'}} onClick={logoutHandler}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavComp;