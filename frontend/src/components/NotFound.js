import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <FaExclamationTriangle size={50} className="text-warning mb-3" />
          <h1>404 - Page Not Found</h1>
          <p className="lead">The page you are looking for does not exist.</p>
          <Button as={Link} to="/" variant="primary">
            Go Back to Home
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFound;