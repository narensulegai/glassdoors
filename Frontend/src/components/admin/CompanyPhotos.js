import React from "react";
import {
  fetchCompanyPhotos,
  approveAnImage,
  fileUrl,
} from "../../util/fetch/api";
import Paginate from '../Paginate';
import { slicePage } from '../../util';

export default class CompanyPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyPhotos: [], currentPage: 0 };
  }

  componentDidMount() {
    this.getUnApprovedCompanyPhotos();
  }

  onPageChange = (i) => {
    this.setState({ currentPage: i });
  };

  getUnApprovedCompanyPhotos = async () => {
    try {
      const companyPhotos = await fetchCompanyPhotos("private");
      this.setState({ companyPhotos });
    } catch (error) {
      console.log(error);
    }
  };

  approve = async (companyPhotosId) => {
    try {
      await approveAnImage(companyPhotosId, "approved");
      this.getUnApprovedCompanyPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  reject = async (companyPhotosId) => {
    try {
      await approveAnImage(companyPhotosId, "rejected");
      this.getUnApprovedCompanyPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const companyPhotos = this.state.companyPhotos;

    if (companyPhotos.length === 0) {
      return <h6>No pending photos for you to approve at this point of time</h6>;
    }
    return (
      <div className="row">
        <div className="col-6">
          <div>You have {companyPhotos.length} photos to approve</div>
          {slicePage(companyPhotos, this.state.currentPage).map((company) => {
            return <div className="card mt-3">
              <div className="card-body">
                <div className="d-flex">
                  {company.photos.map((p) => {
                    return (
                      <div key={p} className="imageTile mr-3">
                        <img src={fileUrl(p)} alt=""/>
                      </div>
                    );
                  })}
                </div>
                <div className="inputLabel">Company name</div>
                <div>{company.company.name}</div>
                <div className="inputLabel">Uploaded by</div>
                <div>{company.employee.name} ({company.employee.email})</div>
                <div className="mt-3 d-flex justify-content-between">
                  <button className="btn-danger" onClick={() => this.reject(company._id)}>Reject</button>
                  <button className="btn-primary" onClick={() => this.approve(company._id)}>Approve</button>
                </div>
              </div>
            </div>
          })}
           <Paginate
            numItems={this.state.companyPhotos.length}
            onPageChange={this.onPageChange}
            currentPage={this.state.currentPage}
          />
        </div>
      </div>
    );
  }
}
