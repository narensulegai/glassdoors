import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CompanyOverview from './companyHome/CompanyOverview';
import CompanyPhotos from './companyHome/CompanyPhotos';
import AdminCompanyReviews from './companyHome/AdminCompanyReviews';
import AdminCompanyReport from './admin/AdminCompanyReport';

class AdminCompanyHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { companyId: null };
  }

  componentDidMount() {
    this.setState({ companyId: this.props.match.params.id });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg bg-dark">
          <a className="navbar-brand text-light" href="#/">Glassdoor</a>
          <a className="nav-link text-light" href={`#/companyHomePage/${this.state.companyId}/companyOverview`}>Overview</a>
          <a className="nav-link text-light" href={`#/companyHomePage/${this.state.companyId}/reviews`}>Reviews</a>
          <a className="nav-link text-light" href={`#/companyHomePage/${this.state.companyId}/companyPhotos`}>Photos</a>
          <a className="nav-link text-light" href={`#/companyHomePage/${this.state.companyId}/report`}>Report</a>

        </nav>
        <div className="container mt-3">
          <Route path="/companyHomePage/:id/companyOverview" exact>
            <CompanyOverview />
          </Route>
          <Route path="/companyHomePage/:id/reviews" exact component={AdminCompanyReviews} />
          <Route path="/companyHomePage/:id/companyPhotos" exact>
            <CompanyPhotos />
          </Route>
          <Route path="/companyHomePage/:id/report" exact component={AdminCompanyReport} />
        </div>
      </>
    );
  }
}

export default withRouter(AdminCompanyHome);
