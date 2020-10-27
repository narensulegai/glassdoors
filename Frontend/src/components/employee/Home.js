import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Glassdoor</div>
          <a className="nav-link text-light" href="#/employee/search">Search</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/employee/search">
            Search for company/jobs
          </Route>
        </div>
      </>
    );
  }
}

export default Home;
