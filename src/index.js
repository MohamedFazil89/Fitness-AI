import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';


function AppRoutes() {
  // Define your routes here
  let routes = useRoutes([
    { path: '/', element: <App /> },
    { path: '/Dashboard', element: <Dashboard /> },



  ]);

  return routes;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <AppRoutes />
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
