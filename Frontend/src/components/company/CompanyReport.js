import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { getCompanyReport, getJobPosting } from '../../util/fetch/api';

const CompanyReport = () => {
  const [total, setTotal] = useState(0);
  const [byJob, setByJob] = useState({});
  const [jobPostings, setJobPostings] = useState([]);

  useEffect(() => {
    (async () => {
      const report = await getCompanyReport();
      setJobPostings(await getJobPosting());
      const byJob = _.groupBy(report, 'job._id');
      setByJob(byJob);
      setTotal(report.length);
    })();
  }, []);

  return (
    <div className="row">
      <div className="col-12">

        {jobPostings.length === 0 && <div>No job posting to show</div>}

        <h6>{total} applications</h6>
        {jobPostings.map((jp) => {
          return (
            <div key={jp._id} className="card">
              <div className="card-body">
                <div className="inputLabel">{jp.title}</div>
                <div>
                  {byJob[jp._id]
                    ? byJob[jp._id].length
                    : '0'}
                  &nbsp;Applications
                </div>
                <div>
                  {byJob[jp._id]
                    ? (
                      <div>
                        <div>
                          {byJob[jp._id].filter((jobApplication) => jobApplication.status === 'selected').length} selected
                          &nbsp;|&nbsp;
                          {byJob[jp._id].filter((jobApplication) => jobApplication.status === 'rejected').length} rejected
                        </div>
                        <div>
                          {byJob[jp._id].filter((jobApplication) => jobApplication.employee.isMale).length} Male
                          &nbsp;|&nbsp;
                          {byJob[jp._id].filter((jobApplication) => !jobApplication.employee.isMale).length} Female
                        </div>
                      </div>
                    )
                    : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CompanyReport.propTypes = {};

export default CompanyReport;
