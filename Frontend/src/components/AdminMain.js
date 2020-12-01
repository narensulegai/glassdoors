import React, { PureComponent } from 'react';
import { Route } from 'react-router-dom';

class AdminMain extends PureComponent {
  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-success -expand-lg">
          <a className="navbar-brand text-light" href="#/">Glassdoor Admin</a>
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
