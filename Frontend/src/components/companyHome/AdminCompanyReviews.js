import React from 'react';
import { Button } from '@material-ui/core';
import ApprovedReviews from './ApprovedReviews';
import RejectedReviews from './RejectedReviews';

export default class AdminCompanyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { approved: true };
  }

  render() {
    return (
      <div>
        <h3>All Reviews</h3>
        <div>
          <Button
            variant="contained"
            disabled={this.state.approved}
            onClick={() => this.setState({ approved: true })}
          >
            Approved
          </Button>
          <Button
            variant="contained"
            disabled={!this.state.approved}
            onClick={() => this.setState({ approved: false })}
          >
            Rejected
          </Button>
        </div>
        {this.state.approved ? <ApprovedReviews companyId={this.props.match.params.id} /> : <RejectedReviews companyId={this.props.match.params.id} /> }
      </div>
    );
  }
}
