import React from "react";
import {fetchReviewsByCompanyIdAndStatus} from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";
import Paginate from '../Paginate';
import { slicePage } from '../../util';

export default class RejectedReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [],currentPage: 0 };
  }

  componentDidMount() {
    this.getRejectedReviews();
  }

  onPageChange = (i) => {
    this.setState({ currentPage: i });
  };

  getRejectedReviews = async () => {
    try {
      const reviews = await fetchReviewsByCompanyIdAndStatus("rejected", this.props.companyId);
      this.setState({reviews});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const reviews = this.state.reviews;
    if (reviews.length === 0) {
      return <h6>No rejected to show</h6>;
    }
    return (
      <div className="row">
        <div className="col-12">
          <h6>Rejected Reviews</h6>
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
              </div>
            </div>
          })}
           <Paginate
            numItems={reviews.length}
            onPageChange={this.onPageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
