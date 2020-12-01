import React, { useEffect, useRef, useState } from 'react';
import _ from 'lodash';
import {
  fileUrl,
  getCompanyJobApplications, getJobPosting, setJobApplicationStatus,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const CompanyJobApplications = () => {
  const [jobApplications, setJobApplications] = useState({});
  const [jobPosting, setJobPosting] = useState([]);

  const statusRef = useRef({});

  useEffect(() => {
    (async () => {
      const jobPosting = await getJobPosting();
      const jobApplications = await getCompanyJobApplications();
      setJobPosting(jobPosting);
      setJobApplications(_.groupBy(jobApplications, 'job._id'));
    })();
  }, []);

  const handleOnChangeStatus = async (id) => {
    const status = statusRef.current[id].value;
    await setJobApplicationStatus(id, { status });
    window.alert(`Updated status to ${status}`);
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Job applications</h6>
        {jobPosting.length === 0 && <div>You have not got any job posting yet</div>}
        {jobPosting.map((jp) => {
          return (
            <div key={jp._id} className="card mb-3">
              <div className="card-body">
                <div className="mb-3">
                  <span><span className="inputLabel">Job title</span>{jp.title}</span>
                  <span> (has {jobApplications[jp._id] ? jobApplications[jp._id].length : 'No'} application)</span>
                </div>
                {jobApplications[jp._id]
                  ? (
                    <div>
                      {jobApplications[jp._id]
                        .map((jobApplication) => {
                          return (
                            <div key={jobApplication._id} className="card mb-3">
                              <div className="card-body">
                                <a href={fileUrl(jobApplication.coverLetter)}>Cover letter</a>
                                &nbsp;|&nbsp;
                                <a href={fileUrl(jobApplication.resume)}>Resume</a>
                                &nbsp;|&nbsp;

                                <span><span className="inputLabel">Applicant</span>
                                  <a target="_blank" href={`#/employeeHome/${jobApplication.employee._id}`}>
                                    {jobApplication.employee.name}
                                  </a>
                                </span>
                                <div>
                                  <span className="inputLabel">Change current status</span>
                                  <select ref={(el) => statusRef.current[jobApplication._id] = el}
                                    defaultValue={jobApplication.status}>
                                    <option value="submitted">Submitted</option>
                                    <option value="reviewed">Reviewed</option>
                                    <option value="screening">Screening</option>
                                    <option value="interviewing">Interviewing</option>
                                    <option value="hired">Hired</option>
                                  </select>
                                </div>
                                <div><span
                                  className="inputLabel small">Applied on {formatDate(jobApplication.createdAt)}</span>
                                </div>
                                <div className="mt-2">
                                  <button className="btn-success"
                                    onClick={() => handleOnChangeStatus(jobApplication._id)}>
                                    Change status
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  )
                  : <div>No applications yet</div>}
              </div>
            </div>
          );
        })}

      </div>
    </div>
  );
};

CompanyJobApplications.propTypes = {};

export default CompanyJobApplications;
