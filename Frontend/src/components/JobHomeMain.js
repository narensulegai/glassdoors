import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  applyJob, currentUser, fileUrl, getJob,
} from '../util/fetch/api';
import FileUpload from './common/FileUpload';

const JobHomeMain = () => {
  const { id: jobId } = useParams();
  const [job, setJob] = useState(null);
  const [employee, setEmployee] = useState(null);
  const [coverLetterFileId, setCoverLetterFileId] = useState('');
  const resumeRef = useRef();

  useEffect(() => {
    (async () => {
      const { user } = await currentUser();
      setEmployee(user);
      setJob(await getJob(jobId));
    })();
  }, [jobId]);

  const handleOnApply = async () => {
    await applyJob(jobId, { coverLetter: coverLetterFileId, resume: resumeRef.current.value });
    window.alert('Job application sent');
  };

  const handleOnCoverLetterUpload = async ({ files }) => {
    const fileId = files[0];
    setCoverLetterFileId(fileId);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg  bg-dark">
        <a className="navbar-brand text-light" href="#/">Glassdoor</a>
        <a className="nav-link" href="#/logout">Logout</a>
      </nav>
      <div className="container">
        <div className="row">
          <div className="col-12 mt-3">
            {job && employee && (
            <>
              <h4>{job.title}</h4>
              <div><span className="inputLabel">Posted by</span>{job.company.name}</div>

              <div className="inputLabel">
                {coverLetterFileId
                  ? <a href={fileUrl(coverLetterFileId)}>Cover letter</a>
                  : 'Cover letter'}
              </div>
              <FileUpload singleFile onUpload={handleOnCoverLetterUpload} accept="application/pdf" />
              <div className="inputLabel">
                Resume
              </div>
              {employee.primaryResume
                ? (
                  <select defaultValue={employee.primaryResume} ref={resumeRef}>
                    {employee.resumes.map((r) => {
                      return (
                        <option key={r._id} value={r.fileId}>
                          {r.fileName}
                          {r.fileId === employee.primaryResume ? ' (Primary)' : ''}
                        </option>
                      );
                    })}
                  </select>
                )
                : <a href="#/employee/resume">Please upload a resume first</a>}

              <div className="mt-3">
                <button className="btn-primary" onClick={handleOnApply}>Apply</button>
              </div>
            </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobHomeMain;
