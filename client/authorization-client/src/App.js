import React, { Component } from 'react';
import axios from 'axios';
import { Route, withRouter, NavLink } from 'react-router-dom';
import Login from './Auth/Login';
import Register from './Auth/Register';
import Users from './Users/Users';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = [
      
    ];
  }
  render() {
    return (
      <div className="App">
          <Route path='/users' component={Users}/>
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
              <button onClick={this.logout}>Logout</button>
              <Route path="/login" component={Login}/>
              <Route path='/register' component={Register}/>
            </div>

        </header>
      </div>
    );
  }
  logout = event => {
    localStorage.removeItem('jwt');
    this.props.history.push('./')
 }
}

export default withRouter(App);
