import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckSquare, FaGithub } from 'react-icons/fa';

const Header = () => {
  const location = useLocation();
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="lg"
      className="mb-4 shadow"
      style={{
        background: 'linear-gradient(90deg, #0d6efd 55%, #153c6a 100%)',
        borderBottom: '4px solid #FFD600',
        fontFamily: 'Montserrat, Arial, sans-serif',
        letterSpacing: '.5px'
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            fontWeight: 'bold',
            fontSize: '1.45rem',
            letterSpacing: '1px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <FaCheckSquare style={{ fontSize: '1.5rem', color: '#FFD600', marginBottom: 2 }} />
          <span>
            <span style={{ color: '#FFD600', letterSpacing: '2px' }}>Skillcraft</span>{' '}
            Internship <span style={{ color: '#fff' }}>Todo</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ fontSize: '1.1rem', gap: '1rem' }}>
            <Nav.Link
              as={Link}
              to="/"
              active={location.pathname === '/'}
              style={{
                fontWeight: 500,
                color: location.pathname === '/' ? '#FFD600' : '#fff'
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/add"
              active={location.pathname === '/add'}
              style={{
                fontWeight: 500,
                color: location.pathname === '/add' ? '#FFD600' : '#fff'
              }}
            >
              Add Todo
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="https://github.com/Arman-husain/Todo-app"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 500,
                color: '#fff'
              }}
              title="View on GitHub"
            >
              <FaGithub className="me-1" style={{ fontSize: '1.2em' }} />
              <span className="d-none d-md-inline">GitHub</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
