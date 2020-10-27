import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signupCompany, signupEmployee } from '../util/fetch/api';

const Signup = ({ type, history }) => {
  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleSignUp = () => {
    const d = {
      name: name.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    if (type === 'company') {
      signupCompany(d)
        .then(({ token }) => {
          window.localStorage.setItem('token', token);
          history.push('/company/overview');
        });
    }
    if (type === 'employee') {
      signupEmployee(d)
        .then(({ token }) => {
          window.localStorage.setItem('token', token);
          history.push('/employee/search');
        });
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-4" />
        <div className="col-4">
          <h2 className="text-center mt-5">Glassdoor signup</h2>
          <div className="text-center mt-5">Signup as a {type}</div>
          <div className="form-group mt-5">
            <input type="text" ref={name} placeholder="Name" className="form-control" />
          </div>
          <div className="form-group">
            <input type="text" ref={email} placeholder="Email" className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" ref={password} placeholder="Password" className="form-control" />
          </div>
          <div className="form-group text-center">
            <button className="btn-primary" onClick={handleSignUp}>Sign Up</button>
          </div>
        </div>
        <div className="col-4" />
      </div>
    </div>
  );
};

Signup.propTypes = {
  type: PropTypes.string,
  history: PropTypes.any,
};

export default withRouter(Signup);
