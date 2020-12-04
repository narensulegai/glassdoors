import React from "react";
import {fetchReviews, approveAReview} from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";
import Paginate from '../Paginate';
import {slicePage} from '../../util';

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], currentPage: 0};
  }

  componentDidMount() {
    this.getUnApprovedReviews();
  }

  getUnApprovedReviews = async () => {
    try {
      const reviews = await fetchReviews('private');
      this.setState({reviews});
    } catch (error) {
      console.log(error);
    }
  };

  approve = async (reviewID) => {
    try {
      await approveAReview(reviewID, 'approved');
      this.getUnApprovedReviews();
    } catch (error) {
      console.log(error);
    }
  };

  reject = async (reviewID) => {
    try {
      await approveAReview(reviewID, 'rejected');
      this.getUnApprovedReviews();
    } catch (error) {
      console.log(error);
    }
  }

  onPageChange = async (i) => {
    this.setState({
      currentPage: i
    })
  }

  render() {
    const reviews = this.state.reviews;
    if (reviews.length === 0) {
      return <h6>No pending reviews for you to approve at this point of time</h6>;
    }
    return (
      <div className="row">
        <div className="col-6">
          <div>You have {reviews.length} reviews to approve</div>
          {slicePage(reviews, this.state.currentPage).map((review) => {
            return <div className="card mt-3" key={review._id}>
              <div className="card-body">
                <div className="inputLabel">Headline</div>
                <div>{review.headline}</div>
                <div className="inputLabel">Rating</div>
                <Rating
                  name="hover-feedback" value={review.overallRating} precision={0.1}
                  size={"small"} color="red" readOnly/>
                <div className="inputLabel">Description</div>
                <div>{review.description}</div>
                <div className="inputLabel">Pro</div>
                <div>{review.pro}</div>
                <div className="inputLabel">Con</div>
                <div>{review.con}</div>
                <div className="inputLabel">Company name</div>
                <div>{review.company.name}</div>
                <div className="inputLabel">Reviewed by</div>
                <div>{review.employee.email}</div>
                <div className="mt-3 d-flex justify-content-between">
                  <button className="btn-danger" onClick={() => this.reject(review._id)}>Reject</button>
                  <button className="btn-primary" onClick={() => this.approve(review._id)}>Approve</button>
                </div>
              </div>
            </div>
          })}
          <div className="mt-3">
            <Paginate
              numItems={this.state.reviews.length}
              onPageChange={this.onPageChange}
              currentPage={this.state.currentPage}
            />
          </div>
        </div>
      </div>
    );
  }
}
