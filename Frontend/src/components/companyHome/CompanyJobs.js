import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompany } from '../../util/fetch/api';
import Paginate from '../Paginate';
import { slicePage } from '../../util';

const CompanyJobs = () => {
  const { id: companyId } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    (async () => {
      const company = await getCompany(companyId);
      setJobPostings(company.jobPostings);
    })();
  }, [companyId]);

  return (
    <div className="row">
      <div className="col-6">
        {jobPostings.length === 0 && <div>No jobs posted for this company.</div>}
       
          {slicePage(jobPostings, currentPage).map((job) => {
          return (
            <div key={job._id} className="card mb-3">
              <div className="card-body">
                <h4><a href={`#/jobHome/${job._id}`} target="_blank" rel="noopener noreferrer">{job.title}</a></h4>
                <div><span className="inputLabel">Industry</span><span>{job.industry}</span></div>
                <div><span className="inputLabel">Work style</span><span>{job.inPerson ? 'In person' : 'Remote'}</span></div>
                <div><span className="inputLabel">City</span><span>{job.city}</span></div>
              </div>
            </div>
          );
        })}
      
      <div className="mt-3">
          <Paginate
            numItems={jobPostings.length}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
        </div>
    </div>
  );
};

CompanyJobs.propTypes = {

};

export default CompanyJobs;
