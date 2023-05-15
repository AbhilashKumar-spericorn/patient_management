import React from 'react';
// import { useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Link } from 'react-router-dom';
import styled from 'styled-components';

// styled components
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin-left: 30px;
  font-size : 18px;
  font-weight: 500;
  &:hover {
    color: red;
    text-decoration: none;
    border-bottom: 3px solid #cb3066;
  }
`;
const NavTag = styled.a`
  color: white;
  text-decoration: none;
  margin-left: 30px;
  font-size : 18px;
  font-weight: 500;;
  &:hover {
    color: red;
    text-decoration: none;
    border-bottom: 3px solid #cb3066;
  }
`;

const Logo = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: larger;
  font-weight: 800;
  &:hover {
    color: yellow;
  }
`;

const Header = () => {
  return (
    <>
      <div className="navigationbar">
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>
            
            <Logo to="/"  style={{fontSize: '30px', fontFamily: 'Arial, sans-serif',}}>CareCompass</Logo>

            </Navbar.Brand>

            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              className="text-white bg-white"
            />

            <>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/">Home</NavLink>
                  
                 
                  <NavTag href="http://localhost:3001/login">LOGIN</NavTag>
                  <NavTag href="http://localhost:3001/register">Register</NavTag>
                  <NavLink to='/verify-vaccine'>Verify-vaccine-certificate</NavLink>
                  <NavLink to='/verify-consultation'>Verify-consultation-certificate</NavLink>
      </Nav>
              </Navbar.Collapse>
            </>
          </Container>
        </Navbar>
      </div>
     
    </>
  );
};

export default Header;

// rgba(38,60,90,255)
// rgba(16,26,37,255)
