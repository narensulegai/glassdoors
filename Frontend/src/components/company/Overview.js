import React, { createRef, useEffect, useState } from 'react';
import { currentUser, fileUrl, updateCompany } from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';

const Overview = () => {
  const [company, setCompany] = useState({});

  const reloadProfile = async () => {
    const { user: company } = await currentUser();
    setCompany(company);
  };
  useEffect(() => {
    (async () => {
      await reloadProfile();
    })();
  }, []);

  const descriptionRef = createRef();
  const sizeRef = createRef();
  const typeRef = createRef();
  const revenueRef = createRef();
  const headquartersRef = createRef();
  const foundedRef = createRef();
  const websiteRef = createRef();
  const missionRef = createRef();

  const handleOnSave = async () => {
    const d = {
      description: descriptionRef.current.value,
      size: sizeRef.current.value,
      type: typeRef.current.value,
      revenue: revenueRef.current.value,
      headquarters: headquartersRef.current.value,
      founded: foundedRef.current.value,
      website: websiteRef.current.value,
      mission: missionRef.current.value,
    };
    await updateCompany(d);
    await reloadProfile();
    const { user: company } = await currentUser();
    setCompany(company);
    alert("profile update succefully")

  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateCompany({ profilePic: fileId });
    setCompany({ ...company, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-12">
        <h6><span className="inputLabel">{company.name}&nbsp;({company.email})</span></h6>

        <div className="imageTile">
          {company.profilePic
            ? <img src={fileUrl(company.profilePic)} alt="" />
            : <div>No pic uploaded</div>}
        </div>

        <FileUpload singleFile onUpload={handleOnFileUpload} />

        <div className="inputLabel">Description</div>
        <div><input type="text" ref={descriptionRef} defaultValue={company.description} /></div>
        <div className="inputLabel">Size</div>
        <div><input type="number" ref={sizeRef} defaultValue={company.size} /></div>
        <div className="inputLabel">Type</div>
        <div><input type="text" ref={typeRef} defaultValue={company.type} /></div>
        <div className="inputLabel">Revenue</div>
        <div><input type="text" ref={revenueRef} defaultValue={company.revenue} /></div>
        <div className="inputLabel">Headquarters</div>
        <div><input type="text" ref={headquartersRef} defaultValue={company.headquarters} /></div>
        <div className="inputLabel">Founded</div>
        <div><input type="text" ref={foundedRef} defaultValue={company.founded} /></div>
        <div className="inputLabel">Website</div>
        <div><input type="text" ref={websiteRef} defaultValue={company.website} /></div>
        <div className="inputLabel">Mission</div>
        <div><input type="text" ref={missionRef} defaultValue={company.mission} /></div>
        <div className="mt-2">
          <button className="btn-primary" onClick={handleOnSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

Overview.propTypes = {};

export default Overview;
