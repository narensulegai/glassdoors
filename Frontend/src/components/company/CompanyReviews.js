import React from "react";
import { Grid, Button, Input, TextareaAutosize } from "@material-ui/core";
import { getCompanyReviews, replyToReview } from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";

export default class CompanyReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [], reply: "" };
  }
  
  componentDidMount() {
    this.getReviews();
  }

  getReviews = async () => {
    try {
      const reviews = await getCompanyReviews();
      this.setState({ reviews });
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

  onInputChange = (e) => {
    this.setState({
      reply: e.target.value
    });
  }


  render() {
    const reviews = this.state.reviews;
    if(reviews.length === 0 ) {
      return <h5>No reviews for the company yet</h5>;
    }
    return (
      <div>
                <span>Your company has {reviews.length} reviews</span>
        {reviews.map((review) => {
          return (
            <Grid
              container
              style={{
                backgroundColor: "#fff",
                margin: "20px",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <div style={{ display:"block", width:"100%"}}>
                  <Button style={{float: "right"}} variant="contained" onClick={() => this.markFavorite(review._id)}>
                    Mark favorite
                  </Button>
              </div>
              <Grid item xs={8}>
                Reviewed By - {review.employee.email}
              </Grid>
              <Grid
                item
                xs={12}
                style={{ marginBottom: "20px", marginTop: "20px" }}
              >
                Headline - {review.headline}
              </Grid>
              <Grid item xs={12}  style={{ marginBottom: "20px"}}>
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
                  style={{ marginBottom: "20px", marginTop: "20px" }}
                >
                  Pros - {review.pros}
                </Grid>
              ) : null}
              {review.cons ? (
                <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  Cons - {review.cons}
                </Grid>
              ) : null}
              <div style={{ width: "100%" }}>
                <div className="inputLabel">Reply</div>
                <div>
                  <TextareaAutosize type="text" placeholder="Add reply" style={{ width: "80%"}} defaultValue={review.reply} onChange={this.onInputChange}></TextareaAutosize>
                  <Button variant="contained" style={{ float: "right"}} onClick={() => this.reply(review._id)}>
                      Reply
                  </Button>
                </div>
              </div>
              <div style={{ width: "100%" }}>
              </div>
            </Grid>
          );
        })}
      </div>
    );
  }
}
