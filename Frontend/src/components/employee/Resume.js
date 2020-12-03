import React, { useEffect, useState } from 'react';
import {
  addResume, currentUser, fileUrl, setPrimaryResume,
} from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const Resume = () => {
  const [employee, setEmployee] = useState(null);
  const reloadEmployee = async () => {
    const { user: employee } = await currentUser();
    setEmployee(employee);
  };

  useEffect(() => {
    (async () => {
      await reloadEmployee();
    })();
  }, []);

  const handleOnMakePrimary = async (fileId) => {
    await setPrimaryResume(fileId);
    await reloadEmployee();
  };

  const handleOnResumeUpload = async ({ files, originalFiles }) => {
    const fileId = files[0];
    const fileName = originalFiles[0];
    await addResume(fileId, { fileName });
    await reloadEmployee();
  };

  return (
    <div className="row">
      <div className="col-6">
        {employee && (
        <>
          <h6>My resumes</h6>
          {employee.resumes.length === 0 && <div>You have not added any resumes</div>}
          {employee.resumes.map((f) => {
            return (
              <div key={f.fileId} className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <a href={fileUrl(f.fileId)}>{f.fileName}</a>
                  {employee.primaryResume === f.fileId
                    ? <button className="btn-primary">Primary resume</button>
                    : <button className="btn-primary" onClick={() => handleOnMakePrimary(f.fileId)}>Make primary</button>}
                </div>
              </div>
            );
          })}
          <div className="inputLabel">
            Add new resume
          </div>
          <FileUpload singleFile onUpload={handleOnResumeUpload} accept="application/pdf" />
        </>
        )}

      </div>
    </div>
  );
};

Resume.propTypes = {

};

export default Resume;
