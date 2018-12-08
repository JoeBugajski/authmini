import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import Login from './Auth/Login';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <header className="App-header">
            <div className="navLinks">
              <NavLink to="/login">
                <h1>Agent Login</h1>
              </NavLink>
              <NavLink to='/register'>
                <h1>New Agent</h1>
              </NavLink>
              <NavLink to='/users'>
                <h1>Active Agents</h1>
              </NavLink>
            </div>
          <Route path="/login" component={Login}/>
        </header>
      </div>
    );
  }
}

export default App;
