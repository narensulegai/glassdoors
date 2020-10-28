import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class AdminMain extends Component {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <div className="navbar-brand text-light">Glassdoor Admin</div>
          <a className="nav-link text-light" href="#/admin/reviewsAndPictures">Reviews and pictures</a>
          <a className="nav-link text-light" href="#/admin/companyProfilePage">Company profile page</a>
          <a className="nav-link text-light" href="#/admin/analyticsDashboard">Analytics dashboard</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container mt-3">
          <Route path="/admin/reviewsAndPictures" exact>
            Reviews and pictures
          </Route>
          <Route path="/admin/companyProfilePage" exact>
            Company profile page
          </Route>
          <Route path="/admin/analyticsDashboard" exact>
            Analytics dashboard
          </Route>
        </div>
      </>
    );
  }
}

export default AdminMain;
