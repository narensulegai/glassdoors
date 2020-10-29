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
      foundedRef: foundedRef.current.value,
      website: websiteRef.current.value,
      mission: missionRef.current.value,
    };
    await updateCompany(d);
    await reloadProfile();
    const { user: company } = await currentUser();
    setCompany(company);
  };

  const handleOnFileUpload = async ({ files }) => {
    const fileId = files[0];
    await updateCompany({ profilePic: fileId });
    setCompany({ ...company, profilePic: fileId });
  };

  return (
    <div className="row">
      <div className="col-12">
        <h4><b>{company.name}</b>&nbsp;({company.email})</h4>

        <div className="imageTile">
          {company.profilePic
            ? <img src={fileUrl(company.profilePic)} alt="" />
            : <div>No pic uploaded</div>}
        </div>

        <FileUpload singleFile onUpload={handleOnFileUpload} />

        <div><b>Description</b></div>
        <div><input type="text" ref={descriptionRef} defaultValue={company.description} /></div>
        <div><b>Size</b></div>
        <div><input type="number" ref={sizeRef} defaultValue={company.size} /></div>
        <div><b>Type</b></div>
        <div><input type="text" ref={typeRef} defaultValue={company.type} /></div>
        <div><b>Revenue</b></div>
        <div><input type="text" ref={revenueRef} defaultValue={company.revenue} /></div>
        <div><b>Headquarters</b></div>
        <div><input type="text" ref={headquartersRef} defaultValue={company.headquarters} /></div>
        <div><b>Founded</b></div>
        <div><input type="text" ref={foundedRef} defaultValue={company.founded} /></div>
        <div><b>Website</b></div>
        <div><input type="text" ref={websiteRef} defaultValue={company.website} /></div>
        <div><b>Mission</b></div>
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
