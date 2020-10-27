import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Logout extends Component {
  async componentDidMount() {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    return <div className="text-center">Logging out</div>;
  }
}

export default withRouter(Logout);
