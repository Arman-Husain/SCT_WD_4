import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import TodoService from '../services/TodoService';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    completed: false
  });
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(isEditMode);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditMode) {
      fetchTodo();
    }
    // eslint-disable-next-line
  }, [id]);

  const fetchTodo = async () => {
    setFetchLoading(true);
    try {
      const response = await TodoService.getTodoById(id);
      const todo = response.data;
      setFormData({
        title: todo.title,
        description: todo.description || '',
        completed: todo.completed
      });
    } catch (err) {
      toast.error('Failed to fetch todo details');
      console.error('Error fetching todo:', err);
      navigate('/');
    } finally {
      setFetchLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      if (isEditMode) {
        await TodoService.updateTodo(id, formData);
        toast.success('Todo updated successfully');
      } else {
        await TodoService.createTodo(formData);
        toast.success('Todo created successfully');
      }
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred';
      toast.error(errorMessage);
      console.error('Error saving todo:', err);

      // Handle validation errors from server
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading todo details...</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header as="h5">{isEditMode ? 'Edit Todo' : 'Create New Todo'}</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter todo title"
                    isInvalid={!!errors.title}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.title}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter todo description (optional)"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="completed">
                  <Form.Check
                    type="checkbox"
                    label="Mark as completed"
                    name="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button variant="secondary" onClick={() => navigate('/')}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">
                          {isEditMode ? 'Updating...' : 'Creating...'}
                        </span>
                      </>
                    ) : (
                      <>{isEditMode ? 'Update Todo' : 'Create Todo'}</>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoForm;
