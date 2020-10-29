import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileAndActivity from './employee/ProfileAndActivity';
import JobPreferences from './employee/JobPreferences';
import Demographics from './employee/Demographics';

class EmployeeMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Glassdoor</div>
          <a className="nav-link text-light" href="#/employee/companies">Companies</a>
          <a className="nav-link text-light" href="#/employee/jobs">Jobs</a>
          <a className="nav-link text-light" href="#/employee/myJobApplications">My job applications</a>
          <a className="nav-link text-light" href="#/employee/profileAndActivity">Profile and activity</a>
          <a className="nav-link text-light" href="#/employee/resume">Resume</a>
          <a className="nav-link text-light" href="#/employee/jobPreferences">Job preferences</a>
          <a className="nav-link text-light" href="#/employee/demographics">Demographics</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/employee/companies" exact>
            Search for a company
            <a href="/#/companyHome/:id/overview">Company page</a>
          </Route>
          <Route path="/employee/jobs" exact>
            Search for a job
          </Route>
          <Route path="/employee/myJobApplications" exact>
            My job applications
          </Route>
          <Route path="/employee/profileAndActivity" exact>
            <ProfileAndActivity />
          </Route>
          <Route path="/employee/resume" exact>
            My resume
          </Route>
          <Route path="/employee/jobPreferences" exact>
            <JobPreferences />
          </Route>
          <Route path="/employee/demographics" exact>
            <Demographics />
          </Route>
        </div>
      </>
    );
  }
}

export default EmployeeMain;
