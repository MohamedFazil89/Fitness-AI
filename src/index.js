import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Chat from './Pages/Chat';
import DOB from './Pages/DOB';
import Home from './Pages/Home';


import { Provider } from "react-redux";
import store from './Redux/store';



function AppRoutes() {
  // Define your routes here
  let routes = useRoutes([
    { path: '/', element: <App /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/dashboard/settings', element: <Settings /> },
    { path: '/dashboard/messages', element: <Chat /> },
    { path: '/dob', element: <DOB /> },
    { path: '/dashboard/Home', element: <Home /> },


  ]);

  return routes;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Router>
      <AppRoutes />
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
