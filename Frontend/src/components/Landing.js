import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import { currentUser } from '../util/fetch/api';

export class Landing extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currTab: 'company' };
    this.handleOnLogin = this.handleOnLogin.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
  }

  async componentDidMount() {
    const currUser = await currentUser();
    if (currUser.scope !== null) {
      this.props.history.push(currUser.scope === 'company' ? '/company/overview' : '/employee/search');
    }
  }

  handleOnLogin() {
    this.props.history.push(this.state.currTab === 'company' ? '/company/overview' : '/employee/search');
  }

  toggleLogin() {
    if (this.state.currTab === 'company') {
      this.setState({ currTab: 'employee' });
    } else {
      this.setState({ currTab: 'company' });
    }
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
            <LoginPage onLogin={this.handleOnLogin} type={currTab} />

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
                  : 'No, login as a employee owner'}
              </button>
            </div>
          </div>
          <div className="col-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
