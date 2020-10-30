import React, { useEffect, useState } from 'react';
import {
  currentUser, getEmployeeJobApplications, withdrawJobApplication,
} from '../../util/fetch/api';
import { formatDate } from '../../util';

const MyJobApplications = () => {
  const [employee, setEmployee] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);

  const reloadJobs = async () => {
    const jobApplications = await getEmployeeJobApplications();
    setJobApplications(jobApplications);
  };

  useEffect(() => {
    (async () => {
      const { user: employee } = await currentUser();
      setEmployee(employee);
      await reloadJobs();
    })();
  }, []);

  const withdrawJob = async (id) => {
    if (window.confirm('Are you sure you want to withdraw this applications?')) {
      await withdrawJobApplication(id);
      await reloadJobs();
    }
  };

  return (
    <div className="row">
      <div className="col-6">
        {employee && (
        <>
          <h6>My job applications</h6>
          {jobApplications.length === 0 && <div>You have not applied for any jobs yet</div>}
          {jobApplications.map((jobApplication) => {
            return (
              <div key={jobApplication._id} className="card mb-3">
                <div className="card-body">
                  <div><span className="inputLabel">Job title</span>{jobApplication.job.title}</div>
                  <div><span className="inputLabel">At</span>{jobApplication.job.company.name}</div>
                  <div><span className="inputLabel">Statue</span>{jobApplication.status}</div>
                  <div><span className="inputLabel small">Applied on {formatDate(jobApplication.createdAt)}</span></div>
                  <div className="mt-3">
                    <button className="btn-danger" onClick={() => withdrawJob(jobApplication._id)}>Withdraw</button>
                  </div>
                </div>
              </div>
            );
          })}
        </>
        )}
      </div>
    </div>
  );
};

MyJobApplications.propTypes = {

};

export default MyJobApplications;
