import React, { createRef, useEffect, useState } from 'react';
import {
  currentUser, updateEmployee,
} from '../../util/fetch/api';

const JobPreferences = () => {
  const [employee, setEmployee] = useState(null);

  const reloadJobPreferences = async () => {
    const { user: employee } = await currentUser();
    setEmployee(employee);
  };
  useEffect(() => {
    (async () => {
      await reloadJobPreferences();
    })();
  }, []);

  const jobSearchStatusRef = createRef();
  const jobTitleLookingForRef = createRef();
  const targetSalaryRef = createRef();
  const openToRelocationRef = createRef();
  const typeOfIndustryRef = createRef();

  const handleOnSave = async () => {
    const d = {
      jobSearchStatus: jobSearchStatusRef.current.value,
      jobTitleLookingFor: jobTitleLookingForRef.current.value,
      targetSalary: targetSalaryRef.current.value,
      openToRelocation: openToRelocationRef.current.checked,
      typeOfIndustry: typeOfIndustryRef.current.value,
    };
    await updateEmployee(d);
    await reloadJobPreferences();
  };

  return (
    <div className="row">
      <div className="col-6">
        {employee && (
        <>
          <div className="inputLabel">Job search status</div>
          <select ref={jobSearchStatusRef} defaultValue={employee.jobSearchStatus}>
            <option value="not-looking">Not looking</option>
            <option value="casually-looking">Casually</option>
            <option value="actively-looking">Actively looking</option>
          </select>
          <div className="inputLabel">Job title looking for</div>
          <input type="text" ref={jobTitleLookingForRef} defaultValue={employee.jobTitleLookingFor} />
          <div className="inputLabel">Target salary</div>
          <input type="text" ref={targetSalaryRef} defaultValue={employee.targetSalary} />
          <div className="inputLabel">Open to relocation</div>
          Yes/No&nbsp;<input type="checkbox" ref={openToRelocationRef} defaultChecked={employee.openToRelocation} />
          <div className="inputLabel">Type of industry</div>
          <input type="text" ref={typeOfIndustryRef} defaultValue={employee.typeOfIndustry} />

          <div className="mt-2">
            <button className="btn-primary" onClick={handleOnSave}>Save</button>
          </div>
        </>
        )}
      </div>
      { employee && <div className="col-6">
          <h6></h6>

          <div className="card mb-3">
            <div className="card-header">
              <div className="small inputLabel">Your Saved Information</div>
            </div>
            <div className="card-body">
              <div className="inputLabel">Job Search Status</div>
              <div>{employee.jobSearchStatus}</div>
              <div className="inputLabel">Job title looking for</div>
              <div>{employee.jobTitleLookingFor}</div>
              <div className="inputLabel">Target salary</div>
              <div>{employee.targetSalary}</div>
              <div className="inputLabel">Open to relocation</div>
              <div>{employee.openToRelocation}</div>
              <div className="inputLabel">Type of industry</div>
              <div>{employee.typeOfIndustry}</div>
            </div>
          </div>
        </div> }
    </div>
  );
};

JobPreferences.propTypes = {};

export default JobPreferences;
