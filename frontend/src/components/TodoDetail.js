import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaArrowLeft, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import TodoService from '../services/TodoService';

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, [id]);

  const fetchTodo = async () => {
    setLoading(true);
    try {
      const response = await TodoService.getTodoById(id);
      setTodo(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todo details. The todo might have been deleted or does not exist.');
      toast.error('Failed to fetch todo details');
      console.error('Error fetching todo:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await TodoService.deleteTodo(id);
        toast.success('Todo deleted successfully');
        navigate('/');
      } catch (err) {
        toast.error('Failed to delete todo');
        console.error('Error deleting todo:', err);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await TodoService.updateTodo(id, updatedTodo);
      setTodo(updatedTodo);
      toast.success(`Todo marked as ${updatedTodo.completed ? 'completed' : 'active'}`);
    } catch (err) {
      toast.error('Failed to update todo status');
      console.error('Error updating todo status:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading todo details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button variant="primary" as={Link} to="/">
          <FaArrowLeft /> Back to Todo List
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Button variant="outline-primary" as={Link} to="/" className="me-2">
                  <FaArrowLeft /> Back
                </Button>
                <span className="h5 mb-0">Todo Details</span>
              </div>
              <div>
                <Button
                  variant={todo.completed ? 'outline-warning' : 'outline-success'}
                  className="me-2"
                  onClick={handleToggleComplete}
                >
                  {todo.completed ? (
                    <>
                      <FaTimes /> Mark as Active
                    </>
                  ) : (
                    <>
                      <FaCheck /> Mark as Completed
                    </>
                  )}
                </Button>
                <Button
                  variant="outline-primary"
                  as={Link}
                  to={`/edit/${todo.id}`}
                  className="me-2"
                >
                  <FaEdit /> Edit
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                  <FaTrash /> Delete
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={3} className="fw-bold">Status:</Col>
                <Col md={9}>
                  <Badge bg={todo.completed ? 'success' : 'warning'}>
                    {todo.completed ? 'Completed' : 'Active'}
                  </Badge>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3} className="fw-bold">Title:</Col>
                <Col md={9}>
                  <h4>{todo.title}</h4>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3} className="fw-bold">Description:</Col>
                <Col md={9}>
                  {todo.description ? (
                    <p className="mb-0">{todo.description}</p>
                  ) : (
                    <p className="text-muted mb-0">No description provided</p>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={3} className="fw-bold">Created At:</Col>
                <Col md={9}>{formatDate(todo.createdAt)}</Col>
              </Row>
              {todo.updatedAt && (
                <Row className="mb-3">
                  <Col md={3} className="fw-bold">Last Updated:</Col>
                  <Col md={9}>{formatDate(todo.updatedAt)}</Col>
                </Row>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoDetail;