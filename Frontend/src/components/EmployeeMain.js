import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileAndActivity from './employee/ProfileAndActivity';
import JobPreferences from './employee/JobPreferences';
import Demographics from './employee/Demographics';
import CompanySearch from './employee/CompanySearch';
import Resume from './employee/Resume';

class EmployeeMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">Glassdoor</a>
          <a className="nav-link text-light" href="#/employee/companySearch">Company search</a>
          <a className="nav-link text-light" href="#/employee/jobSearch">Job search</a>
          <a className="nav-link text-light" href="#/employee/jobApplications">Job applications</a>
          <a className="nav-link text-light" href="#/employee/profileAndActivity">Profile and activity</a>
          <a className="nav-link text-light" href="#/employee/resume">Resume</a>
          <a className="nav-link text-light" href="#/employee/jobPreferences">Job preferences</a>
          <a className="nav-link text-light" href="#/employee/demographics">Demographics</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/employee/companySearch" exact>
            <CompanySearch />
          </Route>
          <Route path="/employee/jobSearch" exact>
            Search for a job
          </Route>
          <Route path="/employee/jobApplications" exact>
            Job applications
          </Route>
          <Route path="/employee/profileAndActivity" exact>
            <ProfileAndActivity />
          </Route>
          <Route path="/employee/resume" exact>
            <Resume />
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
