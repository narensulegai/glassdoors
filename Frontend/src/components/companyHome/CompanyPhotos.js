import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { addCompanyPhotos, fileUrl, getCompanyPhotos } from '../../util/fetch/api';
import FileUpload from '../common/FileUpload';
import { formatDate } from '../../util';

const CompanyPhotos = () => {
  const { id: companyId } = useParams();
  const [companyPhotos, setCompanyPhotos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      setCompanyPhotos(await getCompanyPhotos(companyId));
    })();
  }, [companyId]);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleOnFileUpload = async ({ files }) => {
    await addCompanyPhotos(companyId, { photos: files });
    toggleModal();
  };

  return (
    <div className="row">

      <div className="col-12">
        <Modal show={showModal} onHide={toggleModal} animation={false}>
          <div className="modal-body">
            <div className="inputLabel">Select photos you want to upload</div>
            <FileUpload onUpload={handleOnFileUpload} singleFile={false} />
            <div className="mt-2 d-flex justify-content-between">
              <button className="btn-link" onClick={toggleModal}>Cancel</button>
            </div>
          </div>
        </Modal>
        <button className="btn-primary mt-2" onClick={toggleModal}>Add photos</button>
      </div>

      <div className="col-12">
        {companyPhotos.length === 0
          ? <div className="mt-3 mb-3">There are no photos for this company</div>
          : companyPhotos.map((photo) => {
            return (
              <div key={photo._id} className="card mt-3">
                <div className="card-body">
                  <div className="d-flex">
                    {photo.photos.map((p) => {
                      return (
                        <div key={p} className="imageTile mr-3">
                          <img src={fileUrl(p)} alt="" />
                        </div>
                      );
                    })}
                  </div>
                  <div className="inputLabel">Uploaded by {photo.employee.name}</div>
                  <div className="inputLabel small">{formatDate(photo.createdAt)}</div>
                </div>
              </div>
            );
          })}
      </div>

    </div>
  );
};

CompanyPhotos.propTypes = {};

export default CompanyPhotos;
