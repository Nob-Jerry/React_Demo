import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import component gốc của ứng dụng
import './index.css'; // Import file CSS chính
import { AuthProvider } from './context/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);