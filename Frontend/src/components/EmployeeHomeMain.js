import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { fileUrl, getEmployee } from '../util/fetch/api';

class EmployeeHomeMain extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { employee: null };
  }

  async componentDidMount() {
    const employee = await getEmployee(this.props.match.params.id);
    this.setState({ employee });
  }

  render() {
    return (
      <>
        <nav className="navbar navbar-dark bg-success">
          <a className="navbar-brand text-light" href="#/">Glassdoor</a>
        </nav>
        <div className="container mt-3" />
        <div className="col-12 text-center">
          <h6>Candidate profile</h6>
        </div>
        <div className="col-12 mt-3">
          {this.state.employee && (
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="imageTile">
                <img src={fileUrl(this.state.employee.profilePic)} alt="" />
              </span>
              <div><span className="inputLabel">Name</span>{this.state.employee.name}</div>
              <div>
                <span className="inputLabel">Resume</span>
                <a href={fileUrl(this.state.employee.primaryResume)}>Resume</a>
              </div>
              <div><span className="inputLabel">Email</span>{this.state.employee.email}</div>
              <div><span className="inputLabel">Job search</span>{this.state.employee.jobSearchStatus}</div>
              <div><span
                className="inputLabel">Open to relocate</span>{this.state.employee.openToRelocation ? 'Yes' : 'No'}
              </div>
            </div>
          )}
        </div>
      </>
    );
  }
}

export default withRouter(EmployeeHomeMain);
