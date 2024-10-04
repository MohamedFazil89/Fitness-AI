import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Settings from './Pages/Settings';
import Chat from './Pages/Chat';


import { Provider } from "react-redux";
import store from './Redux/store';



function AppRoutes() {
  // Define your routes here
  let routes = useRoutes([
    { path: '/', element: <App /> },
    { path: '/Dashboard', element: <Dashboard /> },
    { path: '/Settings', element: <Settings /> },
    { path: '/Messages', element: <Chat /> },





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
