import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CompanyOverview from './companyHome/CompanyOverview';
import CompanyJobs from './companyHome/CompanyJobs';
import CompanySalaries from './companyHome/CompanySalaries';
import CompanyReviews from './companyHome/CompanyReviews';
import CompanyPhotos from './companyHome/CompanyPhotos';
import CompanyInterviews from './companyHome/CompanyInterviews';

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
        <nav className="navbar navbar-dark bg-success -expand-lg">
          <a className="navbar-brand text-light" href="#/" style="color: green">Glassdoor</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyOverview`}>Overview</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/addReview`}>Reviews</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyJobs`}>Jobs</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companySalaries`}>Salaries</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyInterviews`}>Interviews</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyPhotos`}>Photos</a>
          <a className="nav-link" href="#/logout">Logout</a>
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
          <Route path="/companyHome/:id/companyInterviews" exact>
            <CompanyInterviews />
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
