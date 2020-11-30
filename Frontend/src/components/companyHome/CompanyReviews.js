import React, { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Button from '@material-ui/core/Button';
import { addReview, getReviews, addHelpfulVotes } from '../../util/fetch/api';
import { formatDate } from '../../util';

const CompanyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [employeeId, setEmployeeId] = useState(null);

  const [mostPositiveReview, setMostPositiveReview] = useState(null);
  const [mostNegativeReview, setMostNegativeReview] = useState(null);

  const { id: companyId } = useParams();

  const reloadReviews = async () => {
    const reviews = await getReviews(companyId);

    console.log(reviews.employeeId);
    setEmployeeId(reviews.employeeId);
    setReviews(reviews.reviews);
    setAverageRating(reviews.averageRating);
    setMostPositiveReview(reviews.mostPositiveReview);
    setMostNegativeReview(reviews.mostNegativeReview);
  };
  useEffect(() => {
    (async () => {
      await reloadReviews();
    })();
  }, []);

  const overAllRatingRef = createRef();
  const ceoApprovalRatingRef = createRef();
  const headlineRef = createRef();
  const recommendToFriendRef = createRef();
  const descriptionRef = createRef();
  const prosRef = createRef();
  const consRef = createRef();

  const setReviewAsHelpful = async (reviewId) => {
    await addHelpfulVotes(reviewId);
    await reloadReviews();
  };

  const handleOnAdd = async () => {
    const d = {
      overallRating: overAllRatingRef.current.value,
      ceoApprovalRating: ceoApprovalRatingRef.current.value,
      headline: headlineRef.current.value,
      description: descriptionRef.current.value,
      pros: prosRef.current.value,
      cons: consRef.current.value,
      recommendToFriend: recommendToFriendRef.current.checked,
    };
    await addReview(companyId, d);
    await reloadReviews();
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Add a review</h6>
        <div className="inputLabel">Overall rating</div>
        <select ref={overAllRatingRef}>
          <option value="5">Very good</option>
          <option value="4">Good</option>
          <option value="3">Average</option>
          <option value="2">Not good</option>
          <option value="1">Bad</option>
        </select>
        <div className="inputLabel">CEO approval</div>
        <select ref={ceoApprovalRatingRef}>
          <option value="5">Very good</option>
          <option value="4">Good</option>
          <option value="3">Average</option>
          <option value="2">Not good</option>
          <option value="1">Bad</option>
        </select>
        <div className="inputLabel">Headline</div>
        <input type="text" ref={headlineRef} />
        <div className="inputLabel">Description</div>
        <input type="text" ref={descriptionRef} />
        <div className="inputLabel">Pros</div>
        <input type="text" ref={prosRef} />
        <div className="inputLabel">Cons</div>
        <input type="text" ref={consRef} />
        <div className="inputLabel">Will you recommend to friend</div>
        Yes/No&nbsp;
        <input type="checkbox" ref={recommendToFriendRef} />
        <div className="mt-2">
          <button className="btn-primary" onClick={handleOnAdd}>
            Add
          </button>
        </div>
      </div>

      <div className="col-6">
        <h6>Reviews</h6>
        <div className="card-header">
          <div>Overall Average Rating</div>
          <Rating
            name="hover-feedback"
            value={averageRating}
            precision={0.1}
            size="small"
            color="red"
            readOnly
          />
        </div>

        {mostPositiveReview && (
          <div className="card mb-3">
            <div className="card-header">
              <h3>Most Positive Review</h3>

              <div>{mostPositiveReview.headline}</div>
              <div className="small inputLabel">
                by {mostPositiveReview.employee.name}
              </div>
            </div>
            <div className="card-body">
              <div>{mostPositiveReview.description}</div>
              <div className="inputLabel">
                Average Rating(Based on Overall Rating & CEO Rating)
              </div>
              <div>
                {(mostPositiveReview.overallRating
                  + mostPositiveReview.ceoApprovalRating)
                  / 2}
              </div>
              <div className="inputLabel">Pros</div>
              <div>{mostPositiveReview.pros}</div>
              <div className="inputLabel">Cons</div>
              <div>{mostPositiveReview.cons}</div>
              <div className="small inputLabel">
                {mostPositiveReview.helpfulVotes.length} people found this
                helpful
              </div>
              {mostPositiveReview.helpfulVotes.filter(
                (voterId) => voterId === employeeId,
              ).length === 0 ? (
                <div>
                  <div className="inputLabel">Did you find this helpful</div>
                  <Button
                    variant="contained"
                    onClick={() => setReviewAsHelpful(mostPositiveReview._id)}
                  >
                    Yes
                  </Button>{' '}
                </div>
                ) : null}
              <div className="small inputLabel">
                {mostPositiveReview.recommendToFriend
                  ? 'Will recommend to friend'
                  : 'Will not recommend to friend'}
              </div>
              <div className="small inputLabel">
                {formatDate(mostPositiveReview.createdAt)}
              </div>
            </div>
          </div>
        )}
        {mostNegativeReview && (
          <div className="card mb-3">
            <div className="card-header">
              <h4>Most Negative Review</h4>

              <div>{mostNegativeReview.headline}</div>
              <div className="small inputLabel">
                by {mostNegativeReview.employee.name}
              </div>
            </div>
            <div className="card-body">
              <div>{mostNegativeReview.description}</div>
              <div className="inputLabel">
                Average Rating(Based on Overall Rating & CEO Rating)
              </div>
              <div>
                {(mostNegativeReview.overallRating
                  + mostNegativeReview.ceoApprovalRating)
                  / 2}
              </div>
              <div className="inputLabel">Pros</div>
              <div>{mostNegativeReview.pros}</div>
              <div className="inputLabel">Cons</div>
              <div>{mostNegativeReview.cons}</div>
              <div className="small inputLabel">
                {mostNegativeReview.helpfulVotes.length} people found this
                helpful
              </div>
              {mostNegativeReview.helpfulVotes.filter(
                (voterId) => voterId === employeeId,
              ).length === 0 ? (
                <div>
                  <div className="inputLabel">Did you find this helpful</div>
                  <Button
                    variant="contained"
                    onClick={() => setReviewAsHelpful(mostNegativeReview._id)}
                  >
                    Yes
                  </Button>{' '}
                </div>
                ) : null}
              <div className="small inputLabel">
                {mostNegativeReview.recommendToFriend
                  ? 'Will recommend to friend'
                  : 'Will not recommend to friend'}
              </div>
              <div className="small inputLabel">
                {formatDate(mostNegativeReview.createdAt)}
              </div>
            </div>
          </div>
        )}

        <div className="card-header">
          <h4>Other Reviews</h4>
        </div>

        {reviews.map((review) => {
          if (
            (mostPositiveReview && mostPositiveReview._id === review._id)
            || (mostNegativeReview && mostNegativeReview._id === review._id)
          ) {
            console.log(review._id);
            return null;
          }
          return (
            <div key={review._id} className="card mb-3">
              <div className="card-header">
                <div>{review.headline}</div>
                <div className="small inputLabel">
                  by {review.employee.name}
                </div>
              </div>
              <div className="card-body">
                <div>{review.description}</div>
                <div className="inputLabel">
                  Average Rating(Based on Overall Rating & CEO Rating)
                </div>
                <div>
                  {(review.overallRating + review.ceoApprovalRating) / 2}
                </div>
                <div className="inputLabel">Pros</div>
                <div>{review.pros}</div>
                <div className="inputLabel">Cons</div>
                <div>{review.cons}</div>
                <div className="small inputLabel">
                  {review.helpfulVotes.length} people found this helpful
                </div>
                {review.helpfulVotes.filter((voterId) => voterId === employeeId)
                  .length === 0 ? (
                    <div>
                      <div className="inputLabel">Did you find this helpful</div>
                      <Button
                        variant="contained"
                        onClick={() => setReviewAsHelpful(review._id)}
                    >
                        Yes
                      </Button>{' '}
                    </div>
                  ) : null}
                <div className="small inputLabel">
                  {review.recommendToFriend
                    ? 'Will recommend to friend'
                    : 'Will not recommend to friend'}
                </div>
                <div className="small inputLabel">
                  {formatDate(review.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CompanyReviews.propTypes = {};

export default CompanyReviews;
