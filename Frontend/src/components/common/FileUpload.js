import React from 'react';
import PropTypes from 'prop-types';
import { apiUrl } from '../../util/fetch';

const FileUpload = ({ singleFile, onUpload }) => {
  const handleOnChange = (e) => {
    const { files } = e.target;
    const data = new FormData();

    for (const file of files) {
      data.append('files', file, file.name);
    }

    const token = localStorage.getItem('token');
    
    fetch(`${apiUrl}/file`, {
      headers: { authorization: token },
      method: 'POST',
      body: data,
    })
      .then((response) => response.json())
      .then(onUpload);
  };
  return (
    singleFile
      ? <input type="file" accept="image/*" onChange={handleOnChange} className="uploadButton" />
      : <input type="file" accept="image/*" onChange={handleOnChange} className="uploadButton" multiple />
  );
};

FileUpload.propTypes = {
  onUpload: PropTypes.func,
  singleFile: PropTypes.bool,
};

export default FileUpload;
