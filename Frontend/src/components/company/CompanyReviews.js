import React from "react";
import {Button} from "@material-ui/core";
import {getCompanyReviews, replyToReview, markFavorite, markFeatured} from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Paginate from '../Paginate';
import {slicePage} from '../../util';

export default class CompanyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = {reviews: [], reply: "", currentPage: 0};
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = async () => {
    try {
      const reviews = await getCompanyReviews();
      this.setState({reviews});
    } catch (error) {
      console.log(error);
    }
  };

  reply = async (reviewID) => {
    try {
      const reply = this.state.reply;
      await replyToReview(reviewID, reply);
      this.getReviews();
    } catch (error) {
      console.log(error);
    }
  };

  markFavorite = async (reviewID, status) => {
    try {
      await markFavorite(reviewID, status);
      this.getReviews();
    } catch (error) {
      console.log(error);
    }
  }

  markFeatured = async (reviewID) => {
    try {
      await markFeatured(reviewID);
      this.getReviews();
    } catch (error) {
      console.log(error);
    }
  }

  onInputChange = (e) => {
    this.setState({
      reply: e.target.value
    });
  }

  onPageChange = async (i) => {
    this.setState({
      currentPage: i
    })
  }

  render() {
    const reviews = this.state.reviews;
    if (reviews.length === 0) {
      return <h6>No reviews for your company yet</h6>;
    }
    return (
      <div className="row">
        <div className="col-12">
          <div>Your company has {reviews.length} review(s)</div>
          {slicePage(reviews, this.state.currentPage).map((review) => {
            return (
              <div className="card mt-3" key={review._id}>
                <div className="card-body d-flex justify-content-between">
                  <div>
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
                    <div>
                      <span className="inputLabel">Leave a reply</span>
                      <input type="text" defaultValue={review.reply} onChange={this.onInputChange} className="mr-2"/>
                      <button className="btn-primary" onClick={() => this.reply(review._id)}>Reply</button>
                    </div>
                  </div>

                  <div>
                    <Button onClick={() => this.markFavorite(review._id, !review.favorite)}
                            title="Mark as favorite review">
                      {review.favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                    </Button>

                    <Button onClick={() => this.markFeatured(review._id)} title="Mark as featured review">
                      {review.featured ? <StarIcon/> : <StarBorderIcon/>}
                    </Button>
                  </div>

                </div>
              </div>
            );
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
