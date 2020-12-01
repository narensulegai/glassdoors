import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileAndActivity from './employee/ProfileAndActivity';
import JobPreferences from './employee/JobPreferences';
import Demographics from './employee/Demographics';
import CompanySearch from './employee/CompanySearch';
import Resume from './employee/Resume';
import MyJobApplications from './employee/MyJobApplications';
import JobSearch from './employee/JobSearch';

class EmployeeMain extends Component {
  render() {
    return (
      <>
      
        <nav className="navbar navbar-dark bg-success -expand-lg">
          <a className="navbar-brand text-light" href="#/">Glassdoor</a>
          <a className="nav-link text-light" href="#/employee/companySearch">Company search</a>
          <a className="nav-link text-light" href="#/employee/jobSearch">Job search</a>
          <a className="nav-link text-light" href="#/employee/myJobApplications">Job applications</a>
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
            <JobSearch />
          </Route>
          <Route path="/employee/myJobApplications" exact>
            <MyJobApplications />
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
