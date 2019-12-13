import React from 'react';
import {Link} from 'react-router-dom';

import './Dashboard.css';

import store, {LOGOUT} from '../../store';
import axios from 'axios';

import Property from '../Property/Property'

const logo = require('./header_logo.png');

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      store: store.getState(),
      properties: []
    }

    this.getProperties= this.getProperties.bind(this);
  }

  componentDidMount(){
    this.getProperties(this.state.store.loggedInUser.id);
  }

  getProperties() {
    axios
      .get('./api/properties')
      .then(res => {
        this.setState({
          properties: res.data
        });
      })
      .catch(err => console.log(err));
  }

  logout() {
    axios.get('/api/auth/logout').then(
      store.dispatch({
        type: LOGOUT,
        payload: null
      })
    )
  }

  render() {
    const { properties } = this.state;
    const mappedProperties = properties.map(property => {
      return (
        <div key={ property.property_id } >
          <Property
            property={property}
          />
        </div>
      );
    })
    return (
      <div className="dashboard">
        <header className="dashboard-header">
          <div>
            <img src={logo} alt="logo" />
            <h1>Houser</h1>
            <h2>Dashboard</h2>
            <button>Logout</button>
          </div>
        </header>
        <div>
          <div>
            Add/Filter
            <Link to="/wizard/1"><button>Add new property</button></Link>
          </div>
          <div>
            <h3>Home Listings</h3>
            <div className="property-list">
              {mappedProperties}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;