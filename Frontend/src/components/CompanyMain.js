import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class CompanyMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Glassdoor</div>
          <a className="nav-link text-light" href="#/company/overview">Overview</a>
          <a className="nav-link text-light" href="#/company/review">Reviews</a>
          <a className="nav-link text-light" href="#/company/job">Job posting</a>
          <a className="nav-link text-light" href="#/company/applications">Applications</a>
          <a className="nav-link text-light" href="#/company/report">Report</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/company/overview" exact>
            Overview
            <a href="/#/companyHome/:id/overview" target="_blank">Company page</a>
          </Route>
          <Route path="/company/review" exact>
            Review
          </Route>
          <Route path="/company/job" exact>
            Job
          </Route>
          <Route path="/company/applications" exact>
            Applications
          </Route>
          <Route path="/company/report" exact>
            Report
          </Route>
        </div>
      </>
    );
  }
}

export default CompanyMain;
