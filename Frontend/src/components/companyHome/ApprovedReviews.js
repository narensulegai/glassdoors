import React from "react";
import {Grid} from "@material-ui/core";
import {fetchReviewsByCompanyIdAndStatus} from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";
import {slicePage} from "../../util";
import Paginate from "../Paginate";

export default class ApprovedReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []};
  }

  componentDidMount() {
    this.getApprovedReviews();
  }

  getApprovedReviews = async () => {
    try {
      const reviews = await fetchReviewsByCompanyIdAndStatus("approved", this.props.companyId);
      this.setState({reviews});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const reviews = this.state.reviews;
    if (reviews.length === 0) {
      return <h6>No Approved reviews to show</h6>;
    }
    return (
      <div className="row">
        <div className="col-12">
          <h6>Approved Reviews</h6>
          {reviews.map((review) => {
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
              </div>
            </div>
          })}
        </div>
      </div>
    );
  }
}
