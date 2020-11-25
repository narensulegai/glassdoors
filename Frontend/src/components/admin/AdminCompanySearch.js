import React, {
    createRef, useEffect, useState,
  } from 'react';
  import { searchCompany } from '../../util/fetch/api';
  import Pagination from '../../util/paginate/Pagination'
  
  const CompanySearch = () => {
    const [companies, setCompanies] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage] = useState(2);
    //const searchTextRef = createRef();
    //console.log("Companies",companies)

    const searchTextRef = createRef();
    // TODO useCallback
    const handleOnSearch = async () => {
      console.log("I am running too in handle")
      const text = searchTextRef.current.value;
      setCompanies(await searchCompany(text));
    };
  
    useEffect(() => {
      console.log("I am running in useeffect")
      handleOnSearch();
    }, []);
  

    const indexOfLastCompanies = currentPage * companiesPerPage;
    const indexOfFirstcompanies = indexOfLastCompanies - companiesPerPage;
    const currentCompanies = companies.slice(indexOfFirstcompanies, indexOfLastCompanies);
    console.log("currentCompanies",currentCompanies)
  
     // Change page
     const paginate = pageNumber => setCurrentPage(pageNumber);
  

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
          </div>
  

          <Pagination
        companiesPerPage={companiesPerPage}
        totalCompanies={companies.length}
        paginate={paginate}
      />

        </div>
      </div>
    );
  };
  
  CompanySearch.propTypes = {};
  
  export default CompanySearch;
  