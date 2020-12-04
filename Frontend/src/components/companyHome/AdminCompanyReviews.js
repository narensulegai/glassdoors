import React from 'react';
import ApprovedReviews from './ApprovedReviews';
import RejectedReviews from './RejectedReviews';

export default class AdminCompanyReviews extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="col-6">
          <ApprovedReviews companyId={this.props.match.params.id} />
        </div>
        <div className="col-6">
          <RejectedReviews companyId={this.props.match.params.id} />
        </div>
      </div>
    );
  }
}
