import React, { createRef, useEffect, useState } from 'react';
import { addJobPosting, getJobPosting } from '../../util/fetch/api';
import { formatDate } from '../../util';

const JobPosting = () => {
  const [jobPosting, setJobPosting] = useState([]);

  const reloadJobPosting = async () => {
    const jobPosting = await getJobPosting();
    setJobPosting(jobPosting);
  };
  useEffect(() => {
    (async () => {
      await reloadJobPosting();
    })();
  }, []);

  const titleRef = createRef();
  const industryRef = createRef();
  const countryRef = createRef();
  const remoteRef = createRef();
  const streetAddressRef = createRef();
  const cityRef = createRef();
  const stateRef = createRef();
  const zipRef = createRef();

  const handleOnAdd = async () => {
    const d = {
      title: titleRef.current.value,
      industry: industryRef.current.value,
      country: countryRef.current.value,
      inPerson: !remoteRef.current.checked,
      streetAddress: streetAddressRef.current.value,
      city: cityRef.current.value,
      state: stateRef.current.value,
      zip: zipRef.current.value,
    };
    await addJobPosting(d);
    await reloadJobPosting();
  };

  return (
    <div className="row">
      <div className="col-6">
        <h6>Add job posting</h6>
        <div><b>Job title</b></div>
        <div><input type="text" ref={titleRef} /></div>
        <div><b>Industry</b></div>
        <div><input type="text" ref={industryRef} /></div>
        <div><b>Country</b></div>
        <div><input type="text" ref={countryRef} /></div>
        <div>
          <div><b className="mr-3">Work style</b></div>
          <div>
            <input type="radio" name="workStyle" defaultChecked />&nbsp;In-person&nbsp;
            <input type="radio" name="workStyle" ref={remoteRef} />&nbsp;Remote
          </div>
        </div>
        <div><b>Street address</b></div>
        <div><input type="text" ref={streetAddressRef} /></div>
        <div><b>City</b></div>
        <div><input type="text" ref={cityRef} /></div>
        <div><b>State</b></div>
        <div><input type="text" ref={stateRef} /></div>
        <div><b>Zip</b></div>
        <div><input type="text" ref={zipRef} /></div>
        <div className="mt-3">
          <button className="btn-primary" onClick={handleOnAdd}>Add</button>
        </div>
      </div>
      <div className="col-6">
        <h6>Current job posting</h6>
        {jobPosting.length === 0 && <div>You have not posted any jobs yet.</div>}
        {jobPosting.map((j) => {
          return (
            <div key={j._id} className="card mb-3">
              <div className="card-body">
                <div><b>Title&nbsp;</b>{j.title}</div>
                <div><b>Industry&nbsp;</b>{j.industry}</div>
                <div><b>Country&nbsp;</b>{j.country}</div>
                <div><b>Work style&nbsp;</b>{j.inPerson ? 'In-person' : 'Remote'}</div>
                <div className="small">Created on {formatDate(j.createdAt)}</div>
              </div>
            </div>
          );
        }) }
      </div>
    </div>
  );
};

JobPosting.propTypes = {

};

export default JobPosting;
