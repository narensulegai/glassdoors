import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Login from './Login';
import { currentUser } from '../util/fetch/api';

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: 'company' };
  }

  landingPage = (scope) => {
    let landingPage = '/employee/companies';
    if (scope === 'admin') {
      landingPage = '/admin/reviewsAndPictures';
    }
    if (scope === 'company') {
      landingPage = '/company/overview';
    }
    return landingPage;
  }
  async componentDidMount() {
    const { scope } = await currentUser();
    if (scope === null) return;
    this.props.history.push(this.landingPage(scope));
  }

  handleOnLogin = () => {
    this.props.history.push(this.landingPage(this.state.currTab));
  }

  toggleLogin = () => {
    if (this.state.currTab === 'company') {
      this.setState({ currTab: 'employee' });
    } else {
      this.setState({ currTab: 'company' });
    }
  }

  adminLogin = () => {
    this.setState({ currTab: 'admin' });
  }

  render() {
    const { currTab } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-3" />
          <div className="col-6">
            <div className="h3 text-center mt-3">Glassdoor</div>
            <div className="text-center">{`Sign in as a ${currTab}`}</div>
            <Login onLogin={this.handleOnLogin} type={currTab} />

            <div className="d-flex justify-content-center">
              <div>Dont have a account ?&nbsp;&nbsp;</div>
              <a href="#/companySignup">Sign up as a company</a>
              <div>&nbsp;or&nbsp;</div>
              <a href="#/employeeSignup">Sign up as a employee</a>
            </div>
            <div className="text-center mt-4">
              <button className="btn btn-outline-primary" onClick={this.toggleLogin}>
                {currTab === 'employee'
                  ? 'No, login as company'
                  : 'No, login as a employee'}
              </button>
              <div className="btn-link mt-2" onClick={this.adminLogin}>Login admin</div>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
