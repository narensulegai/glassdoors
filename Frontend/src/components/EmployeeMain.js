import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class EmployeeMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Glassdoor</div>
          <a className="nav-link text-light" href="#/employee/companies">Companies</a>
          <a className="nav-link text-light" href="#/employee/jobs">Jobs</a>
          <a className="nav-link text-light" href="#/employee/myJobApplications">My job applications</a>
          <a className="nav-link text-light" href="#/employee/profile">Profile</a>
          <a className="nav-link text-light" href="#/employee/resume">Resume</a>
          <a className="nav-link text-light" href="#/employee/jobPreference">Job preference</a>
          <a className="nav-link text-light" href="#/employee/demographics">Demographics</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/employee/companies" exact>
            Search for a company
          </Route>
          <Route path="/employee/jobs" exact>
            Search for a job
          </Route>
          <Route path="/employee/myJobApplications" exact>
            My job applications
          </Route>
          <Route path="/employee/profile" exact>
            My profile
          </Route>
          <Route path="/employee/resume" exact>
            My resume
          </Route>
          <Route path="/employee/jobPreference" exact>
            Job preference
          </Route>
          <Route path="/employee/demographics" exact>
            Demographics
          </Route>
        </div>
      </>
    );
  }
}

export default EmployeeMain;
