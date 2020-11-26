import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { PAGE_SIZE } from '../util';

const Paginate = ({ numItems, onPageChange, currentPage }) => {
  const pageSize = PAGE_SIZE;

  const pages = (num) => {
    const p = Math.ceil(num / pageSize);
    const r = [];
    for (let i = 0; i < p; i += 1) {
      r.push(i);
    }
    return r;
  };

  useEffect(() => {
    // Reset to page 0 if number of items change
    onPageChange(0);
  }, [numItems, onPageChange]);

  return (numItems > 0) && (
    <>
      <div className="d-flex justify-content-center align-items-center mt-2">
        {pages(numItems).map((p, i) => {
          return (
            <div className={`pageNum mr-1 pointer ${currentPage === i ? 'active' : ''}`}
              key={p} onClick={() => onPageChange(i)}>
              {p + 1}
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-center align-items-center mt-2">
        <div className="small mr-3">Showing <b>{pageSize}</b> items per page of {numItems} items</div>
      </div>
    </>
  );
};

Paginate.propTypes = {
  onPageChange: PropTypes.func,
  numItems: PropTypes.number,
  currentPage: PropTypes.number,
};

export default Paginate;
