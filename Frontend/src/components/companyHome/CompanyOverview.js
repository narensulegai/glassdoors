import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompany } from '../../util/fetch/api';

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
          <h4>{company.name}</h4>
          <div><span className="inputLabel">Website</span><span>{company.website || '-'}</span></div>
          <div><span className="inputLabel">Size</span><span>{company.size || '-'}</span></div>
          <div><span className="inputLabel">Type</span><span>{company.type || '-'}</span></div>
          <div><span className="inputLabel">Revenue</span><span>{company.revenue || '-'}</span></div>
          <div><span className="inputLabel">Headquarters</span><span>{company.headquarters || '-'}</span></div>
          <div><span className="inputLabel">Founded</span><span>{company.founded || '-'}</span></div>
          <div><span className="inputLabel">Description</span><span>{company.description || '-'}</span></div>
          <div><span className="inputLabel">Mission</span><span>{company.mission || '-'}</span></div>
          <div><span className="inputLabel">Average rating</span><span>{company.averageRating || '-'}</span></div>
          <div><span className="inputLabel">Featured review</span><span>{company.featuredReview || '-'}</span></div>
          <div><span className="inputLabel">Positive review</span><span>{company.positiveReview || '-'}</span></div>
          <div><span className="inputLabel">Negative review</span><span>{company.negativeReview || '-'}</span></div>
        </>
        )}
      </div>
    </div>
  );
};

CompanyOverview.propTypes = {

};

export default CompanyOverview;
