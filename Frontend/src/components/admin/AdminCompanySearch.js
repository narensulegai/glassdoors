import React, { createRef, useEffect, useState } from "react";
import { searchCompany } from "../../util/fetch/api";
import Paginate from "../Paginate";
import { slicePage } from "../../util";

const AdminCompanySearch = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const searchTextRef = createRef();
  // TODO useCallback
  const handleOnSearch = async () => {
    const text = searchTextRef.current.value;
    setCompanies(await searchCompany(text));
  };

  useEffect(() => {
    handleOnSearch();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <div className="d-flex">
          <input
            type="text"
            className="w-100"
            placeholder="Search for company by name"
            ref={searchTextRef}
          />
          <button className="btn-primary" onClick={handleOnSearch}>
            Search
          </button>
        </div>

        <div className="mt-3">
          {companies.length === 0 && <div>No companies to show</div>}
          {slicePage(companies, currentPage).map((c) => {
            return (
              <div key={c._id} className="card mb-3">
                <div className="card-body">
                  <h5>
                    <a
                      href={`/#/companyHomePage/${c._id}/companyOverview`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {c.name}
                    </a>
                  </h5>

                  <div>
                    <span className="inputLabel">Average rating</span>
                    <span>-</span>
                  </div>

                  <div>
                    <span className="inputLabel">Location</span>
                    <span>{[c.city, c.state].join(", ")}</span>
                    <span className="divider" />
                    <span className="inputLabel">Website</span>
                    <span>{c.website}</span>
                  </div>

                  <div>
                    <span className="inputLabel"># Reviews</span>
                    <span>-</span>
                    <span className="divider" />
                    <span className="inputLabel"># Salary reviews</span>
                    <span>-</span>
                    <span className="divider" />
                    <span className="inputLabel"># Interview reviews</span>
                    <span>-</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-3">
          <Paginate
            numItems={companies.length}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

AdminCompanySearch.propTypes = {};

export default AdminCompanySearch;
