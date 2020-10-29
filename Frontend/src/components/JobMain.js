import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';

class JobMain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { jobId: null };
  }

  componentDidMount() {
    this.setState({ jobId: this.props.match.params.id });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-expand-lg  bg-dark">
          <a className="navbar-brand text-light" href="#/">Glassdoor</a>
          <a className="nav-link" href="#/logout">Logout</a>
        </nav>
        <div className="container">
          Job main page {this.state.jobId}
        </div>
      </>
    );
  }
}

export default withRouter(JobMain);
