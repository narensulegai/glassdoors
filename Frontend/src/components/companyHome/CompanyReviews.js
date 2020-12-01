import React, { createRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  addReview, getReviews,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const CompanyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { id: companyId } = useParams();

  const reloadReviews = async () => {
    const reviews = await getReviews(companyId);
    setReviews(reviews);
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
        Yes/No&nbsp;<input type="checkbox" ref={recommendToFriendRef} />

        <div className="mt-2">
          <button className="btn-success" onClick={handleOnAdd}>Add</button>
        </div>
      </div>

      <div className="col-6">
        <h6>Reviews</h6>
        {reviews.map((review) => {
          return (
            <div key={review._id} className="card mb-3">
              <div className="card-header">
                <div>{review.headline}</div>
                <div className="small inputLabel">by {review.employee.name}</div>
              </div>
              <div className="card-body">
                <div>{review.description}</div>
                <div className="inputLabel">Pros</div>
                <div>{review.pros}</div>
                <div className="inputLabel">Cons</div>
                <div>{review.cons}</div>
                <div className="small inputLabel">{review.helpfulVotes.length} people found this helpful</div>
                <div className="small inputLabel">{review.recommendToFriend
                  ? 'Will recommend to friend'
                  : 'Will not recommend to friend'}</div>
                <div className="small inputLabel">{formatDate(review.createdAt)}</div>
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
