import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Overview from './company/Overview';
import JobPosting from './company/JobPosting';
import CompanyJobApplications from './company/CompanyJobApplications';
import CompanyReport from './company/CompanyReport';

class CompanyMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-success -expand-lg">
          <a className="navbar-brand text-light" href="#/">Glassdoor</a>
          <a className="nav-link text-light" href="#/company/overview">Overview</a>
          <a className="nav-link text-light" href="#/company/review">Reviews</a>
          <a className="nav-link text-light" href="#/company/jobPosting">Job posting</a>
          <a className="nav-link text-light" href="#/company/companyJobApplications">Applications</a>
          <a className="nav-link text-light" href="#/company/report">Report</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/company/overview" exact>
            <Overview />
          </Route>
          <Route path="/company/review" exact>
            Review
          </Route>
          <Route path="/company/jobPosting" exact>
            <JobPosting />
          </Route>
          <Route path="/company/companyJobApplications" exact>
            <CompanyJobApplications />
          </Route>
          <Route path="/company/report" exact>
            <CompanyReport />
          </Route>
        </div>
      </>
    );
  }
}

export default CompanyMain;
