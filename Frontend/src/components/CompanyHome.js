import React, { PureComponent } from 'react';
import { Route, withRouter } from 'react-router-dom';
import CompanyOverview from './companyHome/CompanyOverview';
import CompanyJobs from './companyHome/CompanyJobs';

class CompanyHome extends PureComponent {
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
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/reviews`}>Reviews</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/companyJobs`}>Jobs</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/salaries`}>Salaries</a>
          <a className="nav-link text-light" href={`#/companyHome/${this.state.companyId}/photos`}>Photos</a>
        </nav>
        <div className="container mt-3">
          <Route path="/companyHome/:id/companyOverview" exact>
            <CompanyOverview />
          </Route>
          <Route path="/companyHome/:id/reviews" exact>
            Reviews
          </Route>
          <Route path="/companyHome/:id/companyJobs" exact>
            <CompanyJobs />
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

export default withRouter(CompanyHome);
