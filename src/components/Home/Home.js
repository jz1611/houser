import React from 'react';
import axios from 'axios';
import store, { SET_LOGIN } from '../../store';

import './Home.css';

const logo = require('./auth_logo.png');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: store.getState(),
      username: "",
      password: ""
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  changeHandler(key, value) {
    this.setState({
      [key]: value
    });
  }

  async login() {
    const { username, password } = this.state;
    const response = await axios.post('/api/auth/login', { username, password });
    store.dispatch({
      type: SET_LOGIN,
      payload: response.data
    });
    this.setState({
      username: "",
      password: ""
    });
  }

  async register() {
    const { username, password } = this.state;
    const response = await axios.post('/api/auth/register', {username, password});
    store.dispatch({
      type: SET_LOGIN,
      payload: response.data
    })
    this.setState({
      username: '',
      password: ''
    })
  }

  render() {
    return (
      <div className="auth">
        <img className="logo" src={ logo } alt="logo"/>
        <h2>Username</h2>
        <input 
          name="username"
          type="text"
          value={this.state.username}
          onChange={event =>
            this.changeHandler(event.target.name, event.target.value)}
        />
        <h2>Password</h2>
        <input 
          name="password"
          type="password"
          value={this.state.password}
          onChange={event =>
            this.changeHandler(event.target.name, event.target.value)}
        />
        <button onClick={ this.login }>Login</button>
        <button onClick={ this.register }>Register</button>
      </div>
    );
  }
}

export default Home;