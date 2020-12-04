import React from "react";
import {Grid, Button, TextareaAutosize} from "@material-ui/core";
import {getCompanyReviews, replyToReview, markFavorite, markFeatured} from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Paginate from '../Paginate';
import { slicePage } from '../../util';

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
      return <h5>No reviews for the company yet</h5>;
    }
    return (
      <div className="mt-3">
        <div>
          <span>Your company has {reviews.length} review(s)</span>
          {slicePage(reviews, this.state.currentPage).map((review) => {
            return (
              <Grid
                key={review._id}
                container
                style={{
                  backgroundColor: "#fff",
                  margin: "20px",
                  border: "1px solid black",
                  padding: "10px",
                }}
              >
                <div style={{display: "block", width: "100%"}}>
                  <Button style={{float: "right", color: "#c41200"}} variant="contained"
                          onClick={() => this.markFavorite(review._id, !review.favorite)}>
                    {review.favorite ? <FavoriteIcon/> : <FavoriteBorderIcon/>}
                  </Button>
                  <Button style={{float: "right", color: "#ff9529"}} variant="contained"
                          onClick={() => this.markFeatured(review._id)}>
                    {review.featured ? <StarIcon/> : <StarBorderIcon/>}
                  </Button>
                </div>
                <Grid item xs={8}>
                  Reviewed By - {review.employee.email}
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{marginBottom: "20px", marginTop: "20px"}}
                >
                  Headline - {review.headline}
                </Grid>
                <Grid item xs={12} style={{marginBottom: "20px"}}>
                  Description - {review.description}
                </Grid>

                <Rating
                  name="hover-feedback"
                  value={review.overallRating}
                  precision={0.1}
                  size={"small"}
                  color="red"
                  readOnly
                />

                {review.pros ? (
                  <Grid
                    item
                    xs={12}
                    style={{marginBottom: "20px", marginTop: "20px"}}
                  >
                    Pros - {review.pros}
                  </Grid>
                ) : null}
                {review.cons ? (
                  <Grid item xs={12} style={{marginBottom: "20px"}}>
                    Cons - {review.cons}
                  </Grid>
                ) : null}
                <div>
                  <div className="inputLabel">Reply</div>
                  <div>
                    <TextareaAutosize type="text" placeholder="Add reply"
                                      defaultValue={review.reply} onChange={this.onInputChange}/>
                  </div>
                  <div>
                    <Button variant="outlined" onClick={() => this.reply(review._id)}>Reply</Button>
                  </div>
                </div>
              </Grid>
            );
        })}
        </div>
        <div className="mt-3">
        <Paginate
          numItems={this.state.reviews.length}
          onPageChange={this.onPageChange}
          currentPage={this.state.currentPage}
        />
        </div>
      </div>
    );
  }
}
