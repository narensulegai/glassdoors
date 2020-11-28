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
      <div className="col-12">
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
          Yes&nbsp;<input type="checkbox" ref={openToRelocationRef} defaultChecked={employee.openToRelocation} /> &nbsp;
          
{/*          

          <div className="inputLabel">Open to relocation</div>
          <input type="radio" name="Yes" defaultChecked={employee.openToRelocation} ref={openToRelocationRef} />&nbsp;Yes&nbsp;
          <input type="radio" name="No" defaultChecked={!employee.openToRelocation} />&nbsp;No */}
          <div className="inputLabel">Type of industry</div>
          <input type="text" ref={typeOfIndustryRef} defaultValue={employee.typeOfIndustry} />

          <div className="mt-2">
            <button className="btn-primary" onClick={handleOnSave}>Save</button>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

JobPreferences.propTypes = {};

export default JobPreferences;
