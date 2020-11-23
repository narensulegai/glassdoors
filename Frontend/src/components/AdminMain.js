import React, { PureComponent } from "react";
import { Route } from "react-router-dom";
import Reviews from "./admin/Reviews";
import CompanyPhotos from "./admin/CompanyPhotos";
import AdminCompanySearch from "./admin/AdminCompanySearch";


class AdminMain extends PureComponent {
  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
          <a className="navbar-brand text-light" href="#/">
            Glassdoor Admin
          </a>
          <a className="nav-link text-light" href="#/admin/reviews">
            Reviews
          </a>
          <a className="nav-link text-light" href="#/admin/companyPhotos">
            Company Photos
          </a>
          <a className="nav-link text-light" href="#/admin/companySearch">
            Companies
          </a>
          <a className="nav-link text-light" href="#/admin/analyticsDashboard">
            Analytics dashboard
          </a>
          <a className="nav-link" href="#/logout">
            Logout
          </a>
        </nav>
        <div className="container mt-3">
          <Route path="/admin/companySearch" exact>
            <AdminCompanySearch />
          </Route>
          <Route path="/admin/reviews" exact component={Reviews} />
          <Route path="/admin/companyPhotos" exact component={CompanyPhotos} />

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
