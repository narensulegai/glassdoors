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
    <div className="text-center">
      <div className="mt-5">
        <input type="text" placeholder="Email" ref={email} />
      </div>
      <div className="mt-2">
        <input type="password" placeholder="Password" ref={password} />
      </div>
      <div className="mt-3 mb-3">
        <button type="submit" className="btn-primary" onClick={handleOnSignIn}>Sign in</button>
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func,
  type: PropTypes.string,
};

export default Login;
