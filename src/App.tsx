import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './app/routes';

function App() {
  return (
    <Router>
    <AppRoutes />
  </Router>
  );
}

export default App;
