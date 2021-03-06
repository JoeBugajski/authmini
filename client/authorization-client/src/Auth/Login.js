import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  render() {
    return (
      <form 
        className = 'form'
        onSubmit={this.signIn}>
        <div className='inputs'>
          <label>Code Name:</label>
            <input 
              name = "username"
              value={this.state.username}
              type="text"
              onChange={this.handleChange} />
        </div>
        <div className='inputs'>
          <label>Password:</label>
          <input 
            name= "password"
            value={this.state.password}
            type="password"
            onChange={this.handleChange} />
        </div>
        <div>
          <button type="submit">Sign In</button>
        </div>
      </form>
    );
  }
  signIn = event => {
    event.preventDefault();
    axios
      .post('http://localhost:3300/api/login', this.state)
      .then(res => {
        localStorage.setItem('jwt', res.data.token);
        // navigat to /users
        this.props.history.push('/users');
    })
    .catch(err => {
      console.error('Axios Error', err)
    })
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }
}


export default Login;