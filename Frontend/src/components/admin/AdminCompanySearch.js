import React, {
    createRef, useEffect, useState,
  } from 'react';
  import { searchCompany } from '../../util/fetch/api';
  import { Grid, Button } from "@material-ui/core";

  const CompanySearch = () => {
    const [companies, setCompanies] = useState([]);

    const [currentCompanies, setCurrentCompanies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const companiesPerPage = 2;

    const searchTextRef = createRef();
    // TODO useCallback
    const handleOnSearch = async () => {
      console.log("I am running too in handle")
      const text = searchTextRef.current.value;
     const companies = await searchCompany(text);
      setCompanies(companies);
      const initialIndex = (currentPage - 1) * companiesPerPage;
      let lastIndex = (currentPage - 1) * companiesPerPage + companiesPerPage;
      lastIndex = lastIndex > companies.length - 1 ? companies.length : lastIndex;
      setCurrentCompanies(companies.slice(initialIndex, lastIndex));
    };
    const setCurrentPagenumber = async (pageNumber) => {
      await setCurrentPage(pageNumber);
      const initialIndex = (pageNumber - 1) * companiesPerPage;
      let lastIndex = (pageNumber - 1) * companiesPerPage + companiesPerPage;
      lastIndex = lastIndex > companies.length - 1 ? companies.length : lastIndex;
      setCurrentCompanies(companies.slice(initialIndex, lastIndex));
    };
    useEffect(() => {
      console.log("I am running in useeffect")
      handleOnSearch();
    }, []);
  
    const showPaginationButtons = () => {
      const total = companies.length;
      let totalButtons = Math.floor((total / companiesPerPage) + 1);
      const buttons = [];
      for (let i = 0; i < totalButtons; i++) {
        buttons.push(
          <Button variant="contained"  onClick={() => setCurrentPagenumber(i + 1)}>{i + 1}</Button>
        );
      }
      return buttons;
    };

    return (
      <div className="row">
        <div className="col-12">
  
          <div className="d-flex">
            <input type="text" className="w-100" placeholder="Search for company by name" ref={searchTextRef} />
            <button className="btn-primary" onClick={handleOnSearch}>Search</button>
          </div>
  
          <div className="mt-3">
            {currentCompanies.length === 0 && <div>No companies to show</div>}
            {currentCompanies.map((c) => {
              return (
                <div key={c._id} className="card mb-3">
                  <div className="card-body">
  
                    <h5>
                      <a href={`/#/companyHomePage/${c._id}/companyOverview`} target="_blank" rel="noopener noreferrer">
                        {c.name}
                      </a>
                    </h5>
  
                    <div>
                      <span className="inputLabel">Average rating</span><span>-</span>
                    </div>
  
                    <div>
                      <span className="inputLabel">Location</span><span>{[c.city, c.state].join(', ')}</span>
                      <span className="divider" />
                      <span className="inputLabel">Website</span><span>{c.website}</span>
                    </div>
  
                    <div>
                      <span className="inputLabel"># Reviews</span><span>-</span>
                      <span className="divider" />
                      <span className="inputLabel"># Salary reviews</span><span>-</span>
                      <span className="divider" />
                      <span className="inputLabel"># Interview reviews</span><span>-</span>
                    </div>
  
                  </div>
                </div>
              );
            })}
            {showPaginationButtons()}
          </div>

        </div>
      </div>
    );
  };
  
  CompanySearch.propTypes = {};
  
  export default CompanySearch;
  