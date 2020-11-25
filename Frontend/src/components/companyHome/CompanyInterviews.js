import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import {
  addInterviewExperience,
  getCompanyJobPosting,
  getInterviewExperiences,
} from "../../util/fetch/api";
import { formatDate } from "../../util";
import { Chart } from "react-google-charts";

const CompanyInterviews = () => {
  const { id: companyId } = useParams();
  const [jobPostings, setJobPostings] = useState([]);
  const [interviewExperiences, setInterviewExperiences] = useState([]);
  const [positiveExperiences, setPositiveExperiences] = useState(0);
  const [negativeExperiences, setNegativeExperiences] = useState(0);
  const [neutralExperiences, setNeutralExperiences] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const offerStatusRef = useRef();
  const difficultyRef = useRef();
  const questionsRef = useRef();
  const answersRef = useRef();
  const overallExperienceRef = useRef();
  const jobPostingRef = useRef();

  useEffect(() => {
    (async () => {
      setJobPostings(await getCompanyJobPosting(companyId));
      const interviews = await getInterviewExperiences(companyId);
      setInterviewExperiences(interviews);
     setPositiveExperiences(interviews.filter((interview) => interview.overallExperience === "positive").length);
     setNegativeExperiences(interviews.filter((interview) => interview.overallExperience === "negative").length);
     setNeutralExperiences(interviews.filter((interview) => interview.overallExperience === "neutral").length)


    })();
  }, [companyId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOnAdd = async () => {
    const d = {
      difficulty: difficultyRef.current.value,
      offerStatus: offerStatusRef.current.value,
      questions: questionsRef.current.value,
      answers: answersRef.current.value,
      overallExperience: overallExperienceRef.current.value,
      jobPosting: jobPostingRef.current.value,
    };
    await addInterviewExperience(companyId, d);
    toggleModal();
    const interviews = await getInterviewExperiences(companyId);
    setInterviewExperiences(interviews);
    setPositiveExperiences(interviews.filter((interview) => interview.overallExperience === "positive").length);
    setNegativeExperiences(interviews.filter((interview) => interview.overallExperience === "negative").length);
    setNeutralExperiences(interviews.filter((interview) => interview.overallExperience === "neutral").length)
  };

  return (
    <div className="row">
      <div className="col-12">
        {jobPostings.length === 0 ? (
          <div>There are no job posting by this company</div>
        ) : (
          <>
            <Modal show={showModal} onHide={toggleModal} animation={false}>
              <div className="modal-body">
                <div className="inputLabel">Job title</div>
                <select defaultValue={jobPostings[0]._id} ref={jobPostingRef}>
                  {jobPostings.map((job) => {
                    return (
                      <option key={job._id} value={job._id}>
                        {job.title}
                      </option>
                    );
                  })}
                </select>

                <div className="inputLabel">Overall experience</div>
                <select ref={overallExperienceRef}>
                  <option value="positive">Positive</option>
                  <option value="negative">Negative</option>
                  <option value="neutral">Neutral</option>
                </select>

                <div className="inputLabel">Difficulty</div>
                <select ref={difficultyRef}>
                  <option value="easy">Easy</option>
                  <option value="average">Average</option>
                  <option value="difficult">Difficult</option>
                </select>

                <div className="inputLabel">Offer status</div>
                <select ref={offerStatusRef}>
                  <option value="rejected">Rejected</option>
                  <option value="accepted">Accepted</option>
                </select>

                <div className="inputLabel">Questions</div>
                <div>
                  <input type="text" ref={questionsRef} />
                </div>

                <div className="inputLabel">Answers</div>
                <div>
                  <input type="test" ref={answersRef} />
                </div>

                <div className="mt-2 d-flex justify-content-between">
                  <button className="btn-primary" onClick={handleOnAdd}>
                    Add
                  </button>
                  <button className="btn-link" onClick={toggleModal}>
                    Cancel
                  </button>
                </div>
              </div>
            </Modal>

            <button className="btn-primary" onClick={toggleModal}>
              Add interview experience
            </button>
          </>
        )}
      </div>
      <div style={{height: "300px", width: "500px", marginTop: "20px", marginBottom: "20px"}}><Chart
  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['experiences', 'percentage'],
    ['Positive', positiveExperiences],
    ['Negative', negativeExperiences],
    ['Neutral', neutralExperiences],
  ]}

  options={{
    title: 'Interview Experience',
    is3D: true,
    slices: {
      0: { color: '#33ff33' },
      1: { color: '#009900' },
      2: { color: '#3333ff' },

    },
  }}
/></div>
      
      <div className="col-12 mt-2">
        <span><h3>Interview Experiences</h3></span>
        {interviewExperiences.length === 0 && (
          <div>No interview experiences shared yet.</div>
        )}
        {interviewExperiences.map((interviewExperience) => {
          return (
            <div key={interviewExperience._id} className="card mb-3">
              <div className="card-body">
                <div>
                  <span className="inputLabel">Difficulty</span>
                  <span>{interviewExperience.difficulty}</span>
                </div>
                <div>
                  <span className="inputLabel">Offer status</span>
                  <span>{interviewExperience.offerStatus}</span>
                </div>
                <div>
                  <span className="inputLabel">Overall experience</span>
                  <span>{interviewExperience.overallExperience}</span>
                </div>
                <div>
                  <div className="inputLabel">Questions</div>
                  <div>{interviewExperience.questions}</div>
                </div>
                <div>
                  <div className="inputLabel">Answers</div>
                  <div>{interviewExperience.answers}</div>
                </div>
                <div className="small inputLabel">
                  by {interviewExperience.employee.name}
                </div>
                <div className="small inputLabel">
                  {formatDate(interviewExperience.createdAt)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

CompanyInterviews.propTypes = {};

export default CompanyInterviews;
