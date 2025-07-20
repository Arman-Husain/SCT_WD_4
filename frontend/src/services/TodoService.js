import axios from 'axios';

const API_URL = '/api/todos';

class TodoService {
  // Get all todos
  getAllTodos() {
    return axios.get(API_URL);
  }

  // Get todo by id
  getTodoById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // Create a new todo
  createTodo(todo) {
    return axios.post(API_URL, todo);
  }

  // Update an existing todo
  updateTodo(id, todo) {
    return axios.put(`${API_URL}/${id}`, todo);
  }

  // Delete a todo
  deleteTodo(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  // Get todos by completion status
  getTodosByStatus(completed) {
    return axios.get(`${API_URL}/status?completed=${completed}`);
  }

  // Search todos by title
  searchTodosByTitle(title) {
    return axios.get(`${API_URL}/search?title=${title}`);
  }
}

export default new TodoService();