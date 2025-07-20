import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoDetail from './components/TodoDetail';
import Header from './components/Header';
import NotFound from './components/NotFound';

function Footer() {
  return (
    <footer
      className="footer mt-auto py-3"
      style={{
        background: 'linear-gradient(90deg, #153c6a 0%, #0d6efd 70%)',
        color: '#fff',
        borderTop: '4px solid #FFD600',
        fontFamily: 'Montserrat, Arial, sans-serif',
        fontSize: '1rem'
      }}
    >
      <div className="container text-center">
        <div style={{ fontWeight: 700, color: '#FFD600', fontSize: '1.1rem', letterSpacing: '1px' }}>
          Skillcraft Internship Project
        </div>
        <div style={{ margin: '0.25rem 0', color: '#e0e0e0' }}>
          &copy; {new Date().getFullYear()} &middot; Developed by{' '}
          <a
            href="https://github.com/Arman-husain"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#FFD600', textDecoration: 'underline dotted' }}
          >
            Arman-husain
          </a>
        </div>
        <div>
          <small style={{ color: '#e0e0e0', letterSpacing: '.5px' }}>
            For <b>Skillcraft Internship</b> Evaluation &mdash; React Full Stack Todo App
          </small>
        </div>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div
      className="todo-app-container d-flex flex-column min-vh-100"
      style={{
        background: "linear-gradient(120deg, #f1f5fc 70%, #e3ebf7 100%)",
        fontFamily: 'Montserrat, Arial, sans-serif'
      }}
    >
      <Header />
      <div className="flex-fill">
        <ToastContainer position="top-right" autoClose={3000} theme="colored" />
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/add" element={<TodoForm />} />
          <Route path="/edit/:id" element={<TodoForm />} />
          <Route path="/todos/:id" element={<TodoDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
