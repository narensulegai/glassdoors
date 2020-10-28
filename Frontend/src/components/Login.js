import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { loginUser } from '../util/fetch/api';

const Login = ({ onLogin, type }) => {
  const email = createRef();
  const password = createRef();

  const handleOnSignIn = () => {
    loginUser(type, {
      email: email.current.value,
      password: password.current.value,
    })
      .then(({ token, user }) => {
        window.localStorage.setItem('token', token);
        onLogin(user);
      });
  };

  return (
    <>
      <div className="form-group mt-5">
        <input type="email" className="form-control" placeholder="Email" ref={email} />
      </div>
      <div className="form-group">
        <input type="password" className="form-control" placeholder="Password" ref={password} />
      </div>
      <div className="form-group text-center">
        <button type="submit" className="btn btn-primary" onClick={handleOnSignIn}>Sign in</button>
      </div>
    </>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
  type: PropTypes.string,
};

export default Login;
