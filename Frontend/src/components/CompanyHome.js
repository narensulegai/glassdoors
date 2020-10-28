import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

class CompanyHome extends PureComponent {
  componentDidMount() {

  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Company name</div>
          <a className="nav-link text-light" href="#/companyHome/:id/overview">Overview</a>
          <a className="nav-link text-light" href="#/companyHome/:id/reviews">Reviews</a>
          <a className="nav-link text-light" href="#/companyHome/:id/jobs">Jobs</a>
          <a className="nav-link text-light" href="#/companyHome/:id/salaries">Salaries</a>
          <a className="nav-link text-light" href="#/companyHome/:id/photos">Photos</a>
        </nav>
        <div className="container mt-3">
          <Route path="/companyHome/:id/overview" exact>
            Overview
          </Route>
          <Route path="/companyHome/:id/reviews" exact>
            Reviews
          </Route>
          <Route path="/companyHome/:id/jobs" exact>
            Jobs
          </Route>
          <Route path="/companyHome/:id/salaries" exact>
            Salaries
          </Route>
          <Route path="/companyHome/:id/photos" exact>
            Photos
          </Route>
        </div>
      </>
    );
  }
}

export default CompanyHome;
