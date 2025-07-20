import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Badge, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaSearch, FaFilter, FaPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import TodoService from '../services/TodoService';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, [filter]);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      let response;
      if (filter === 'completed') {
        response = await TodoService.getTodosByStatus(true);
      } else if (filter === 'active') {
        response = await TodoService.getTodosByStatus(false);
      } else {
        response = await TodoService.getAllTodos();
      }
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch todos. Please try again later.');
      toast.error('Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      fetchTodos();
      return;
    }

    setLoading(true);
    try {
      const response = await TodoService.searchTodosByTitle(searchTerm);
      setTodos(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to search todos. Please try again later.');
      toast.error('Failed to search todos');
      console.error('Error searching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setSearchTerm('');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await TodoService.deleteTodo(id);
        setTodos(todos.filter(todo => todo.id !== id));
        toast.success('Todo deleted successfully');
      } catch (err) {
        toast.error('Failed to delete todo');
        console.error('Error deleting todo:', err);
      }
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await TodoService.updateTodo(todo.id, updatedTodo);
      setTodos(todos.map(t => t.id === todo.id ? { ...t, completed: !t.completed } : t));
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading todos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
        <Button variant="primary" onClick={fetchTodos}>Try Again</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Row className="align-items-center">
                <Col md={6}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search todos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <Button variant="outline-secondary" onClick={handleSearch}>
                      <FaSearch /> Search
                    </Button>
                  </InputGroup>
                </Col>
                <Col md={4}>
                  <div className="d-flex gap-2">
                    <Button
                      variant={filter === 'all' ? 'primary' : 'outline-primary'}
                      onClick={() => handleFilterChange('all')}
                    >
                      <FaFilter /> All
                    </Button>
                    <Button
                      variant={filter === 'active' ? 'primary' : 'outline-primary'}
                      onClick={() => handleFilterChange('active')}
                    >
                      Active
                    </Button>
                    <Button
                      variant={filter === 'completed' ? 'primary' : 'outline-primary'}
                      onClick={() => handleFilterChange('completed')}
                    >
                      Completed
                    </Button>
                  </div>
                </Col>
                <Col md={2} className="text-end">
                  <Button as={Link} to="/add" variant="success">
                    <FaPlus /> Add Todo
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {todos.length === 0 ? (
        <div className="text-center mt-5">
          <h3>No todos found</h3>
          <p>Create a new todo to get started!</p>
          <Button as={Link} to="/add" variant="primary">
            <FaPlus /> Add Todo
          </Button>
        </div>
      ) : (
        <Row>
          {todos.map((todo) => (
            <Col md={12} key={todo.id} className="mb-3">
              <Card className={`todo-item ${todo.completed ? 'completed' : ''} shadow-sm`}>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col md={1}>
                      <Form.Check
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => handleToggleComplete(todo)}
                        label=""
                      />
                    </Col>
                    <Col md={7}>
                      <Link to={`/todos/${todo.id}`} className="text-decoration-none">
                        <h5 className={`todo-title mb-1 ${todo.completed ? 'text-muted' : ''}`}>
                          {todo.title}
                        </h5>
                      </Link>
                      <p className="text-muted mb-0 small">
                        {todo.description && todo.description.length > 100
                          ? `${todo.description.substring(0, 100)}...`
                          : todo.description || 'No description'}
                      </p>
                    </Col>
                    <Col md={2}>
                      <Badge bg={todo.completed ? 'success' : 'warning'} className="me-2">
                        {todo.completed ? 'Completed' : 'Active'}
                      </Badge>
                      <small className="text-muted d-block">
                        Created: {formatDate(todo.createdAt)}
                      </small>
                    </Col>
                    <Col md={2} className="text-end">
                      <div className="todo-actions d-flex gap-2">
                        <Button
                          as={Link}
                          to={`/edit/${todo.id}`}
                          variant="outline-primary"
                          size="sm"
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDelete(todo.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default TodoList;
