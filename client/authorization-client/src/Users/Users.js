import React, { Component } from 'react';
import axios from 'axios';
import './Users.css';
import spy from './spy.jpg'
import unsplash from 'unsplash-js';
import photos from 'unsplash-js/lib/methods/photos';

const agentTypes =[
  'Special Agent',
  'Secret Agent',
  'Double Agent',
  'Tech Ops Agent'
]


class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

    
  render() {
    return (
      <div className='agentList'>
        <ul>
        <h2>Current Operatives</h2>
          {this.state.users.map(user =>
            <div key={user.id}>
            <img 
              src={spy}
              alt='spy avatar' />
              <li key={user.id}>{agentTypes[Math.floor(Math.random()*agentTypes.length)]} {user.username}</li>
            </div>
            )
          }
        </ul>
      </div>
    );
  }
  componentDidMount() {
    const token = localStorage.getItem('jwt');
    const reqOptions = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get('http://localhost:3300/api/users', reqOptions)
      .then(res => {
        console.log(res.data);
        this.setState({
          users: res.data
        })
      })
      .catch(err => {
        console.error('Axios Error', err);
        this.props.history.push('/login')
      });
  }
}

export default Users;