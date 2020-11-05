import React, { createRef, useEffect, useState } from 'react';
import {
  currentUser, fileUrl, updateEmployee,
} from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const ProfileAndActivity = () => {
  const [employee, setEmployee] = useState(null);

  const reloadProfileAndActivity = async () => {
    const { user: employee } = await currentUser();
    setEmployee(employee);
  };
  useEffect(() => {
    (async () => {
      await reloadProfileAndActivity();
    })();
  }, []);

  const nameRef = createRef();

  const handleOnSave = async () => {
    const d = {
      name: nameRef.current.value,
    };
    await updateEmployee(d);
    await reloadProfileAndActivity();
  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateEmployee({ profilePic: fileId });
    setEmployee({ ...employee, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-12">
        {employee && (
        <>
          <h6><b>{employee.name}</b>&nbsp;({employee.email})</h6>

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
    </div>
  );
};

ProfileAndActivity.propTypes = {};

export default ProfileAndActivity;
