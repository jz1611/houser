import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';

import Home from './components/Home/Home';
import Dashboard from './components/Dashboard/Dashboard';
import NewListing from './components/NewListing/NewListing';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/wizard/1" component={NewListing.NewListing1} />
          <Route
            path="*"
            render={() => {
              return <h1>Invalid Page</h1>
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
