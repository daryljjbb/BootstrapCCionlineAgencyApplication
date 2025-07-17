import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CustomerProvider } from './components/Customer Context/CustomerContext';
import "../scss/main.scss";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CustomerProvider>
        <App />
      </CustomerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
