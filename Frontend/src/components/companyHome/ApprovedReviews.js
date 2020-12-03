import React from "react";
import { Grid } from "@material-ui/core";
import { fetchReviewsByCompanyIdAndStatus } from "../../util/fetch/api";
import Rating from "@material-ui/lab/Rating";

export default class ApprovedReviews extends React.Component {
  constructor(props) {
    super(props);
    this.state = { reviews: [] };
  }

  componentDidMount() {
    this.getApprovedReviews();
  }

  getApprovedReviews = async () => {
    try {
      const reviews = await fetchReviewsByCompanyIdAndStatus("approved", this.props.companyId);
      this.setState({ reviews });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const reviews = this.state.reviews;
    if (reviews.length === 0) {
      return <h5>No Approved Reviews</h5>;
    }
    return (
      <div>
        <span>Approved Reviews</span>
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
              <Grid item xs={12} style={{ marginBottom: "20px" }}>
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

            </Grid>
          );
        })}
      </div>
    );
  }
}
