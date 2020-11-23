import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CompanyOverview from './companyHome/CompanyOverview';
import CompanyReviews from './companyHome/CompanyReviews';
import CompanyPhotos from './companyHome/CompanyPhotos';


class CompanyHomeMain extends PureComponent {
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
          <a className="nav-link text-light" href={`#/companyHomePage/${this.state.companyId}/addReview`}>Reviews</a>
          <a className="nav-link text-light" href={`#/companyHomePage/${this.state.companyId}/companyPhotos`}>Photos</a>
        </nav>
        <div className="container mt-3">
          <Route path="/companyHomePage/:id/companyOverview" exact>
            <CompanyOverview />
          </Route>
          <Route path="/companyHomePage/:id/addReview" exact>
            <CompanyReviews />
          </Route>
          <Route path="/companyHomePage/:id/companyPhotos" exact>
            <CompanyPhotos />
          </Route>
        </div>
      </>
    );
  }
}

export default withRouter(CompanyHomeMain);
