import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider to wrap the app
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter

// Create root for React 18
const root = ReactDOM.createRoot(document.getElementById('root')); // Get the root element
root.render(
  <BrowserRouter> {/* Wrap the App and AuthProvider inside BrowserRouter */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </BrowserRouter>
);
