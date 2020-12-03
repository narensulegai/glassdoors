import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import { getCompany } from '../../util/fetch/api';

const Review = ({ title, review }) => {
  return (
    <div className="card mt-3">
      <div className="card-body">
        <h6>{title}</h6>
        <div>
          <div>
            <span className="inputLabel mr-2">Reviewed by</span>
            {review.employee.name}
          </div>
          <div>
            <span className="inputLabel mr-2">Headline</span>
            {review.headline}
          </div>
          <div>
            <span className="inputLabel mr-2">Description</span>
            {review.description}
          </div>
          <div>
            <span className="inputLabel mr-2">Overall Rating</span>
            <Rating
              name="hover-feedback"
              value={review.overallRating}
              precision={0.1}
              size="small"
              color="red"
              readOnly
          />
          </div>
          <div>
            <span className="inputLabel mr-2">Pros</span>
            {review.pros}
          </div>
          <div>
            <span className="inputLabel mr-2">Cons</span>
            {review.cons}
          </div>
        </div>
      </div>
    </div>
  );
};

Review.propTypes = { title: PropTypes.string, review: PropTypes.object };

const CompanyOverview = () => {
  const { id: companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    (async () => {
      setCompany(await getCompany(companyId));
    })();
  }, [companyId]);

  return (
    <div className="row">
      <div className="col-12">
        {company && (
          <>
            <h6>{company.name}</h6>
            <div>
              <span className="inputLabel mr-2">Website</span>
              <span>{company.website || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Size</span>
              <span>{company.size || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Type</span>
              <span>{company.type || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Revenue</span>
              <span>{company.revenue || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Headquarters</span>
              <span>{company.headquarters || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Founded</span>
              <span>{company.founded || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Description</span>
              <span>{company.description || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Mission</span>
              <span>{company.mission || '-'}</span>
            </div>
            <div>
              <span className="inputLabel mr-2">Average rating</span>
              <span>
                <Rating
                  name="hover-feedback"
                  value={company.reviewData ? company.reviewData.averageRating : 0}
                  precision={0.1}
                  size="small"
                  color="red"
                  readOnly
                />
              </span>
            </div>
            {company.reviewData.positiveReview ? (<Review title="Positive review" review={company.reviewData.positiveReview} />) : null}
            {company.reviewData.negativeReview ? (<Review title="Negative review" review={company.reviewData.negativeReview} />) : null}
          </>
        )}
      </div>
    </div>
  );
};

CompanyOverview.propTypes = {};

export default CompanyOverview;
