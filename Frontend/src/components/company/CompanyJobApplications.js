import React, { useEffect, useRef, useState } from 'react';
import {
  getCompanyJobApplications, setJobApplicationStatus,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const CompanyJobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);

  const statusRef = useRef({});
  useEffect(() => {
    (async () => {
      const jobApplications = await getCompanyJobApplications();
      setJobApplications(jobApplications);
    })();
  }, []);

  const handleOnChangeStatus = async (id) => {
    const status = statusRef.current[id].value;
    await setJobApplicationStatus(id, { status });
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Job applications</h6>
        {jobApplications.length === 0 && <div>You have not got any job applications</div>}
        {jobApplications.map((jobApplication) => {
          return (
            <div key={jobApplication._id} className="card mb-3">
              <div className="card-body">
                <div><span className="inputLabel">Job title</span>{jobApplication.job.title}</div>
                <div><span className="inputLabel">Statue</span>{jobApplication.status}</div>
                <div><span className="inputLabel small">Applied on {formatDate(jobApplication.createdAt)}</span></div>
                <div>
                  <span className="inputLabel">Change status</span>
                  <select ref={(el) => statusRef.current[jobApplication._id] = el}
                    defaultValue={jobApplication.status}>
                    <option value="submitted">Submitted</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="screening">Screening</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="hired">Hired</option>
                  </select>
                </div>
                <div className="mt-2">
                  <button className="btn-primary"
                    onClick={() => handleOnChangeStatus(jobApplication._id)}>
                    Change status
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CompanyJobApplications.propTypes = {

};

export default CompanyJobApplications;
