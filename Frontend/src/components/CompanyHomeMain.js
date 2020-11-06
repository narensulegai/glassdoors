import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CompanyOverview from './companyHome/CompanyOverview';
import CompanyJobs from './companyHome/CompanyJobs';
import CompanySalaries from './companyHome/CompanySalaries';
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
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyOverview`}>Overview</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/addReview`}>Reviews</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyJobs`}>Jobs</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companySalaries`}>Salaries</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/interviews`}>Interviews</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyPhotos`}>Photos</a>
        </nav>
        <div className="container mt-3">
          <Route path="/companyHome/:id/companyOverview" exact>
            <CompanyOverview />
          </Route>
          <Route path="/companyHome/:id/addReview" exact>
            <CompanyReviews />
          </Route>
          <Route path="/companyHome/:id/companyJobs" exact>
            <CompanyJobs />
          </Route>
          <Route path="/companyHome/:id/companySalaries" exact>
            <CompanySalaries />
          </Route>
          <Route path="/companyHome/:id/interviews" exact>
            Interviews
          </Route>
          <Route path="/companyHome/:id/companyPhotos" exact>
            <CompanyPhotos />
          </Route>
        </div>
      </>
    );
  }
}

export default withRouter(CompanyHomeMain);
