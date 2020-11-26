import React from "react";
import { Grid, Button } from "@material-ui/core";
import { fetchReviews, approveAReview } from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";

export default class Reviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
  }
  componentDidMount() {
    this.getUnApprovedReviews();
  }

  getUnApprovedReviews = async () => {
    try {
      const reviews = await fetchReviews('private');
      this.setState({ reviews });
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

  render() {
    const reviews = this.state.reviews;
    if(reviews.length === 0 ) {
      return <h5>No pending reviews for you to approve at this point of time</h5>;
    }
    return (
      <div>
                <span>You have {reviews.length} reviews to approve</span>
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
              <Grid item xs={8}>
                Company Name - {review.company.name}
              </Grid>
              <Grid item xs={4}>
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
                <div style={{ float: "right" }}>
                  <Button variant="contained" onClick={() => this.approve(review._id)}>
                    Approve
                  </Button>
                  <Button variant="contained" onClick={() => this.reject(review._id)}>
                    Reject
                  </Button>
                </div>
              </div>
            </Grid>
          );
        })}
      </div>
    );
  }
}
