import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCompany, fileUrl } from "../../util/fetch/api";
import { Grid } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";

const CompanyOverview = () => {
  const { id: companyId } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    (async () => {
      setCompany(await getCompany(companyId));
    })();
  }, [companyId]);

  return (
    <div className="row">
      <div className="col-12">
        {company && (
          <>
            <div className="imageTile mr-3">
              <img src={fileUrl(company.profilePic)} alt="" />
            </div>
            <h6>{company.name}</h6>
            <div>
              <span className="inputLabel">Website - </span>
              <span>{company.website || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Size - </span>
              <span>{company.size || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Type - </span>
              <span>{company.type || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Revenue - </span>
              <span>{company.revenue || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Headquarters - </span>
              <span>{company.headquarters || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Founded - </span>
              <span>{company.founded || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Description - </span>
              <span>{company.description || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Mission - </span>
              <span>{company.mission || "-"}</span>
            </div>
            <div>
              <span className="inputLabel">Average rating - </span>
              <span>
                {" "}
                <Rating
                  name="hover-feedback"
                  value={company.reviewData.averageRating || 0}
                  precision={0.1}
                  size={"small"}
                  color="red"
                  readOnly
                />
              </span>
            </div>
            <div>
              <span className="inputLabel">Positive review</span>
              <div>
                <Grid
                  container
                  style={{
                    backgroundColor: "#fff",
                    margin: "20px",
                    border: "1px solid black",
                    padding: "10px",
                  }}
                >
                  <Grid item xs={12} style={{ marginBottom: "20px" }}>
                    <span className="inputLabel">Reviewed By - </span>
                    {company.reviewData.positiveReview.employee.name}
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "20px" }}>
                    <span className="inputLabel">Headline - </span>

                    {company.reviewData.positiveReview.headline}
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <span className="inputLabel">Description -</span>
                    {company.reviewData.positiveReview.description}
                  </Grid>
                  <span className="inputLabel"> Overall Rating -</span>
                  <Rating
                    name="hover-feedback"
                    value={company.reviewData.positiveReview.overallRating}
                    precision={0.1}
                    size={"small"}
                    color="red"
                    readOnly
                  />
                  {company.reviewData.positiveReview.pros ? (
                    <Grid
                      item
                      xs={12}
                      style={{ marginBottom: "20px", marginTop: "20px" }}
                    >
                        <span className="inputLabel">Pros -</span> {company.reviewData.positiveReview.pros}
                    </Grid>
                  ) : null}
                  {company.reviewData.positiveReview.cons ? (
                    <Grid item xs={12} style={{ marginBottom: "20px" }}>
                       <span className="inputLabel">Cons -</span>{company.reviewData.positiveReview.cons}
                    </Grid>
                  ) : null}
                </Grid>
              </div>
            </div>
            <div>
              <span className="inputLabel">Negative review</span>
              <div>
                <Grid
                  container
                  style={{
                    backgroundColor: "#fff",
                    margin: "20px",
                    border: "1px solid black",
                    padding: "10px",
                  }}
                >
                  <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <span className="inputLabel">Reviewed By -</span>
                    {company.reviewData.negativeReview.employee.name}
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <span className="inputLabel">Headline -</span> {company.reviewData.negativeReview.headline}
                  </Grid>
                  <Grid item xs={12} style={{ marginBottom: "20px" }}>
                  <span className="inputLabel">Description -</span>
                    {company.reviewData.negativeReview.description}
                  </Grid>
                  <span className="inputLabel"> Overall Rating -</span>
                  <Rating
                    name="hover-feedback"
                    value={company.reviewData.negativeReview.overallRating}
                    precision={0.1}
                    size={"small"}
                    color="red"
                    readOnly
                  />
                  {company.reviewData.negativeReview.pros ? (
                    <Grid
                      item
                      xs={12}
                      style={{ marginBottom: "20px", marginTop: "20px" }}
                    >
                      <span className="inputLabel">Pros -</span> {company.reviewData.negativeReview.pros}
                    </Grid>
                  ) : null}
                  {company.reviewData.negativeReview.cons ? (
                    <Grid item xs={12} style={{ marginBottom: "20px" }}>
                       <span className="inputLabel">Cons -</span> {company.reviewData.negativeReview.cons}
                    </Grid>
                  ) : null}
                </Grid>
              </div>
            </div>
            <div></div>
          </>
        )}
      </div>
    </div>
  );
};

CompanyOverview.propTypes = {};

export default CompanyOverview;
