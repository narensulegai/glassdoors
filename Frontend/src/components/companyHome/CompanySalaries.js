import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { addSalary, getCompanyJobPosting } from '../../util/fetch/api';

const CompanySalaries = () => {
  const { id: companyId } = useParams();
  const [jobPostings, setJobPostings] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const baseSalaryRef = useRef();
  const bonusRef = useRef();
  const yearsOfExperienceRef = useRef();
  const locationRef = useRef();
  const jobPostingRef = useRef();

  useEffect(() => {
    (async () => {
      setJobPostings(await getCompanyJobPosting(companyId));
    })();
  }, [companyId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOnAdd = async () => {
    const d = {
      bonus: bonusRef.current.value,
      baseSalary: baseSalaryRef.current.value,
      yearsOfExperience: yearsOfExperienceRef.current.value,
      location: locationRef.current.value,
    };
    const jobPostingId = jobPostingRef.current.value;
    await addSalary(jobPostingId, d);
    toggleModal();
    setJobPostings(await getCompanyJobPosting(companyId));
  };

  return (
    <div className="row">
      <div className="col-12">
        {jobPostings.length === 0
          ? <div>There are no job posting by this company</div>
          : (
            <>
              <Modal show={showModal} onHide={toggleModal} animation={false}>
                <div className="modal-body">
                  <div className="inputLabel">Job title</div>
                  <select defaultValue={jobPostings[0]._id} ref={jobPostingRef}>
                    {jobPostings.map((job) => {
                      return <option key={job._id} value={job._id}>{job.title}</option>;
                    })}
                  </select>
                  <div className="inputLabel">Base salary</div>
                  <div><input type="number" ref={baseSalaryRef} /></div>
                  <div className="inputLabel">Bonus</div>
                  <div><input type="number" ref={bonusRef} /></div>
                  <div className="inputLabel">Years of experience</div>
                  <div><input type="number" ref={yearsOfExperienceRef} /></div>
                  <div className="inputLabel">Location</div>
                  <div><input type="test" ref={locationRef} /></div>
                  <div className="mt-2 d-flex justify-content-between">
                    <button className="btn-primary" onClick={handleOnAdd}>Add</button>
                    <button className="btn-link" onClick={toggleModal}>Cancel</button>
                  </div>
                </div>
              </Modal>

              <button className="btn-primary" onClick={toggleModal}>Add salary</button>

              {jobPostings.map((job) => {
                return (
                  <div key={job._id} className="card mt-3">
                    <div className="card-body">
                      <div className="inputLabel">{job.title} at {job.city}</div>
                      {(job.minBaseSalary !== null && job.maxBaseSalary !== null)
                        ? <div>Salary range ${job.minBaseSalary} - ${job.maxBaseSalary}</div>
                        : <div>Salary range not available</div>}
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

CompanySalaries.propTypes = {};

export default CompanySalaries;
