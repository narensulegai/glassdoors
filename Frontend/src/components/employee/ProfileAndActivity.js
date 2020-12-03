import React, { createRef, useEffect, useState } from 'react';
import {
  currentUser, fileUrl, updateEmployee, getEmployeeActivity,
} from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';
import { formatDate } from '../../util';

const ProfileAndActivity = () => {
  const [employee, setEmployee] = useState(null);
  const [activity, setActivity] = useState({
    reviews: [], companyPhotos: [], interviewExperiences: [], companySalaries: [],
  });

  const reloadProfile = async () => {
    const { user: employee } = await currentUser();
    setEmployee(employee);
  };
  useEffect(() => {
    (async () => {
      await reloadProfile();
      setActivity(await getEmployeeActivity());
    })();
  }, []);

  const nameRef = createRef();

  const handleOnSave = async () => {
    const d = {
      name: nameRef.current.value,
    };
    await updateEmployee(d);
    await reloadProfile();
  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateEmployee({ profilePic: fileId });
    setEmployee({ ...employee, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-6">
        {employee && (
          <>
            <h6><b>{employee.name}</b></h6>
            <h6>{employee.email}</h6>

            <div className="imageTile">
              {employee.profilePic
                ? <img src={fileUrl(employee.profilePic)} alt="" />
                : <div>No pic uploaded</div>}
            </div>

            <FileUpload singleFile onUpload={handleOnFileUpload} />

            <div className="inputLabel">Name</div>
            <div><input type="text" ref={nameRef} defaultValue={employee.name} /></div>

            <div className="mt-2">
              <button className="btn-primary" onClick={handleOnSave}>Save</button>
            </div>
          </>
        )}
      </div>

      <div className="col-6">
        <h6 className="mt-3">Reviews</h6>
        {activity.reviews.map((r) => {
          return (
            <div className="card mt-2" key={r._id}>
              <div className="card-body">
                <h6>{r.company.name}</h6>
                <div>Headline {r.headline}</div>
                <div>Description {r.description}</div>
                <div>Pros {r.pros}</div>
                <div>Cons {r.cons}</div>
                <div>Rating {r.overallRating}</div>
                <div>Recommend to friend ? {r.recommendToFriend ? 'Yes' : 'No'}</div>
                <div className="small inputLabel">Review on {formatDate(r.createdAt)}</div>
              </div>
            </div>
          );
        })}
        <h6 className="mt-3">Photos</h6>
        {activity.companyPhotos.map((p) => {
          return (
            <div className="card mt-2" key={p._id}>
              <div className="card-body">
                <h6>{p.company.name}</h6>
                {p.photos.map((photo) => {
                  return (
                    <div className="imageTile mr-3" key={photo}>
                      <img src={fileUrl(photo)} alt="" />
                    </div>
                  );
                })}
                <div className="small inputLabel">Posted on {formatDate(p.createdAt)}</div>
              </div>
            </div>
          );
        })}
        <h6 className="mt-3">Interview experiences</h6>
        {activity.interviewExperiences.map((i) => {
          return (
            <div className="card mt-2" key={i._id}>
              <div className="card-body">
                <h6>{i.jobPosting.title} at {i.company.name}</h6>
                <div>Difficulty level {i.difficulty}</div>
                <div>Overall experience{i.overallExperience}</div>
                <div>Offer status{i.offerStatus}</div>
                <div className="small inputLabel">Interviewed on {formatDate(i.createdAt)}</div>
              </div>
            </div>
          );
        })}
        <h6 className="mt-3">Company salaries</h6>
        {activity.companySalaries.map((s) => {
          return (
            <div className="card mt-2" key={s._id}>
              <div className="card-body">
                <h6>{s.jobPosting.title} at {s.company.name}</h6>
                <div>Years of experience {s.yearsOfExperience}</div>
                <div>Base salary ${s.baseSalary}</div>
                <div>Bonus ${s.bonus}</div>
                <div>Location{s.location}</div>
                <div className="small inputLabel">Posted on {formatDate(s.createdAt)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProfileAndActivity.propTypes = {};

export default ProfileAndActivity;
