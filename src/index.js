import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from './contexts/AuthContext';
import AccountContextProvider from './contexts/AccountContext';
import SideBarContextProvider from './contexts/SideBarContext';

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <AccountContextProvider>
        <SideBarContextProvider>
          <Router>
            <App />
          </Router>
        </SideBarContextProvider>
      </AccountContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)