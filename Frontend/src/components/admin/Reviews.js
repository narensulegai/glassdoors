import React from "react";
import { Grid, Button } from "@material-ui/core";
import { fetchUnapprovedReviews, approveAReview } from "../../util/fetch/api";
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
      const reviews = await fetchUnapprovedReviews(true);
      this.setState({ reviews });
    } catch (error) {
      console.log(error);
    }
  };

  approve = async (reviewID) => {
    try {
      await approveAReview(reviewID);
      this.getUnApprovedReviews();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const reviews = this.state.reviews;
    return (
      <div>
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
                {review.headline}
              </Grid>
              <Grid item xs={12}>
                {review.description}
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
                </div>
              </div>
            </Grid>
          );
        })}
      </div>
    );
  }
}
