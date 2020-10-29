import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCompany } from '../../util/fetch/api';

const CompanyJobs = () => {
  const { id: companyId } = useParams();
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    (async () => {
      const company = await getCompany(companyId);
      setJobPostings(company.jobPostings);
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        {jobPostings.length === 0 && <div>No jobs posted for this company.</div>}
        {jobPostings.map((job) => {
          return (
            <div key={job._id} className="card mb-3">
              <div className="card-body">
                <h4><a href={`#/job/${job._id}`} target="_blank">{job.title}</a></h4>
                <div><span className="inputLabel">Work style</span><span>{job.inPerson ? 'In person' : 'Remote'}</span></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CompanyJobs.propTypes = {

};

export default CompanyJobs;
