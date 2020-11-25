import React from "react";
import { Grid, Button } from "@material-ui/core";
import {
  fetchCompanyPhotos,
  approveAnImage,
  fileUrl,
} from "../../util/fetch/api";

export default class CompanyPhotos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { companyPhotos: [] };
  }

  componentDidMount() {
    this.getUnApprovedCompanyPhotos();
  }

  getUnApprovedCompanyPhotos = async () => {
    try {
      const companyPhotos = await fetchCompanyPhotos('private');
      this.setState({ companyPhotos });
    } catch (error) {
      console.log(error);
    }
  };

  approve = async (companyPhotosId) => {
    try {
      await approveAnImage(companyPhotosId, 'approved');
      this.getUnApprovedCompanyPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  reject = async (companyPhotosId) => {
    try {
      await approveAnImage(companyPhotosId, 'rejected');
      this.getUnApprovedCompanyPhotos();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const companyPhotos = this.state.companyPhotos;
    return (
      <div>
        {companyPhotos.map((company) => {
          return (
            <Grid
              container
              style={{
                backgroundColor: "#fff",
                margin: "20px",
                border: "1px solid black",
                padding: "10px",
              }}
            >
              <Grid item xs={8}>
                Company Name - {company.company.name}
              </Grid>
              <Grid item xs={4}>
                Reviewed By - {company.employee.email}
              </Grid>
              <div className="d-flex">
                {company.photos.map((p) => {
                  return (
                    <div key={p} className="imageTile mr-3">
                      <img src={fileUrl(p)} alt="" />
                    </div>
                  );
                })}
              </div>
              <div style={{ width: "100%" }}>
                <div style={{ float: "right" }}>
                  <Button
                    variant="contained"
                    onClick={() => this.approve(company._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => this.reject(company._id)}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            </Grid>
          );
        })}
      </div>
    );
  }
}
