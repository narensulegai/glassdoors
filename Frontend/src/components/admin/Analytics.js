import React from "react";
import { getAnalyticsData } from "../../util/fetch/api";
import { Bar } from "react-chartjs-2";

export default class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      topFiveMostReviewedCompany: {},
      topFiveCompanyWithBestAverageRating: {},
      topFiveStudentsWithMostAcceptedReviewsMade: {},
      topTenCeoBasedOnRating: {},
      topTenCompaniesWithMostViews: {},
      reviewsPerDay: {}

    };
  }

  componentDidMount() {
    this.getAnalyticsData();
  }

  processTopFiveMostReviewedCompany = (data) => {
    const labelsForTopFiveMostReviewdCompany = [];
    const dataForTopFiveMostReviewdCompany = [];
    for (let i = 0; i < data.topFiveCompaniesWithMostreviews.length; i++) {
      labelsForTopFiveMostReviewdCompany.push(
        data.topFiveCompaniesWithMostreviews[i].name[0].name
      );
      dataForTopFiveMostReviewdCompany.push(
        data.topFiveCompaniesWithMostreviews[i].count
      );
    }
    return {
      labelsForTopFiveMostReviewdCompany,
      dataForTopFiveMostReviewdCompany,
    };
  };

  processTopFiveCompanyWithBestAverageRating = (data) => {
    const labelsForTopFiveCompanyWithBestAverageRating = [];
    const dataForTopFiveCompanyWithBestAverageRating = [];
    for (let i = 0; i < data.topFiveCompanyWithBestAverageRating.length; i++) {
      labelsForTopFiveCompanyWithBestAverageRating.push(
        data.topFiveCompanyWithBestAverageRating[i].name[0].name
      );
      dataForTopFiveCompanyWithBestAverageRating.push(
        data.topFiveCompanyWithBestAverageRating[i].average
      );
    }
    return {
      labelsForTopFiveCompanyWithBestAverageRating,
      dataForTopFiveCompanyWithBestAverageRating,
    };
  };

  processTopFiveStudentsWithMostAcceptedReviewsMade = (data) => {
    const labelsForTopFiveStudentsWithMostAcceptedReviewsMade = [];
    const dataForTopFiveStudentsWithMostAcceptedReviewsMade = [];
    for (
      let i = 0;
      i < data.topFiveStudentsWithMostAcceptedReviewsMade.length;
      i++
    ) {
      labelsForTopFiveStudentsWithMostAcceptedReviewsMade.push(
        data.topFiveStudentsWithMostAcceptedReviewsMade[i].name[0].name
      );
      dataForTopFiveStudentsWithMostAcceptedReviewsMade.push(
        data.topFiveStudentsWithMostAcceptedReviewsMade[i].count
      );
    }
    return {
      labelsForTopFiveStudentsWithMostAcceptedReviewsMade,
      dataForTopFiveStudentsWithMostAcceptedReviewsMade,
    };
  };

  processTopTenCeoBasedOnRating = (data) => {
    const labelsForTopTenCeoBasedOnRating = [];
    const dataForTopTenCeoBasedOnRating = [];
    for (let i = 0; i < data.topTenCeoBasedOnRating.length; i++) {
      labelsForTopTenCeoBasedOnRating.push(
        data.topTenCeoBasedOnRating[i].name[0].name
      );
      dataForTopTenCeoBasedOnRating.push(
        data.topTenCeoBasedOnRating[i].ceoRating
      );
    }
    return {
      labelsForTopTenCeoBasedOnRating,
      dataForTopTenCeoBasedOnRating,
    };
  };

  processTopTenCompaniesWithMostViews = (data) => {
    const labelsForTopTenCompaniesWithMostViews = [];
    const dataForTopTenCompaniesWithMostViews = [];
    for (let i = 0; i < data.topTenMostViewedCompanies.length; i++) {
      labelsForTopTenCompaniesWithMostViews.push(
        data.topTenMostViewedCompanies[i].companyName
      );
      dataForTopTenCompaniesWithMostViews.push(
        data.topTenMostViewedCompanies[i].count
      );
    }
    return {
      labelsForTopTenCompaniesWithMostViews,
      dataForTopTenCompaniesWithMostViews,
    };
  };

  processReviewsPerDay = (data) => {
    const labelsForReviewsPerDayInLastOneWeek = [];
    const dataForReviewsPerDayInLastOneWeek = [];
    for (let i = 0; i < data.reviewsPerDayInLastOneWeek.length; i++) {
      labelsForReviewsPerDayInLastOneWeek.push(
        data.reviewsPerDayInLastOneWeek[i].date
      );
      dataForReviewsPerDayInLastOneWeek.push(
        data.reviewsPerDayInLastOneWeek[i].count
      );
    }
    return {
      labelsForReviewsPerDayInLastOneWeek,
      dataForReviewsPerDayInLastOneWeek,
    };
  };


  getAnalyticsData = async () => {
    const data = await getAnalyticsData();

    const topFiveMostReviewedCompany = this.processTopFiveMostReviewedCompany(
      data
    );
    const topFiveCompanyWithBestAverageRating = this.processTopFiveCompanyWithBestAverageRating(
      data
    );
    const topFiveStudentsWithMostAcceptedReviewsMade = this.processTopFiveStudentsWithMostAcceptedReviewsMade(
      data
    );
    const topTenCeoBasedOnRating = this.processTopTenCeoBasedOnRating(data);

    const topTenCompaniesWithMostViews = this.processTopTenCompaniesWithMostViews(data);

    const reviewsPerDay = this.processReviewsPerDay(data);


    this.setState({
      topFiveMostReviewedCompany,
      topFiveCompanyWithBestAverageRating,
      topFiveStudentsWithMostAcceptedReviewsMade,
      topTenCeoBasedOnRating,
      topTenCompaniesWithMostViews,
      reviewsPerDay
    });
  };

  render() {
    return (
      <div>
        {this.state.topFiveMostReviewedCompany ? (
          <div style={{ margin: "50px", border: "1px solid #000" }}>
            <Bar
              data={{
                labels: this.state.topFiveMostReviewedCompany
                  .labelsForTopFiveMostReviewdCompany,
                datasets: [
                  {
                    label: "Count",
                    backgroundColor: "rgba(75,192,192,1)",
                    borderColor: "rgba(0,0,0,1)",
                    data: this.state.topFiveMostReviewedCompany
                      .dataForTopFiveMostReviewdCompany,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Top five most reviewed company",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : null}
        {this.state.topFiveMostReviewedCompany ? (
          <div style={{ margin: "50px", border: "1px solid #000" }}>
            <Bar
              data={{
                labels: this.state.topFiveCompanyWithBestAverageRating
                  .labelsForTopFiveCompanyWithBestAverageRating,
                datasets: [
                  {
                    label: "Average",
                    backgroundColor: "rgba(75,192,192,1)",
                    data: this.state.topFiveCompanyWithBestAverageRating
                      .dataForTopFiveCompanyWithBestAverageRating,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Top five companies based on average rating",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : null}

        {this.state.topFiveMostReviewedCompany ? (
          <div style={{ margin: "50px", border: "1px solid #000" }}>
            <Bar
              data={{
                labels: this.state.topFiveStudentsWithMostAcceptedReviewsMade
                  .labelsForTopFiveStudentsWithMostAcceptedReviewsMade,
                datasets: [
                  {
                    label: "Count",
                    backgroundColor: "rgba(75,192,192,1)",
                    data: this.state.topFiveStudentsWithMostAcceptedReviewsMade
                      .dataForTopFiveStudentsWithMostAcceptedReviewsMade,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Employees/Students with most accepted reviews",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : null}

        {this.state.topTenCeoBasedOnRating ? (
          <div style={{ margin: "50px", border: "1px solid #000" }}>
            <Bar
              data={{
                labels: this.state.topTenCeoBasedOnRating
                  .labelsForTopTenCeoBasedOnRating,
                datasets: [
                  {
                    label: "Average Rating",
                    backgroundColor: "rgba(75,192,192,1)",
                    data: this.state.topTenCeoBasedOnRating
                      .dataForTopTenCeoBasedOnRating,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Top 5 ceos",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : null}
         {this.state.topTenCompaniesWithMostViews ? (
          <div style={{ margin: "50px", border: "1px solid #000" }}>
            <Bar
              data={{
                labels: this.state.topTenCompaniesWithMostViews
                  .labelsForTopTenCompaniesWithMostViews,
                datasets: [
                  {
                    label: "Count",
                    backgroundColor: "rgba(75,192,192,1)",
                    data: this.state.topTenCompaniesWithMostViews
                      .dataForTopTenCompaniesWithMostViews,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Top 10 companies with most views",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : null}
           {this.state.reviewsPerDay ? (
          <div style={{ margin: "50px", border: "1px solid #000" }}>
            <Bar
              data={{
                labels: this.state.reviewsPerDay.labelsForReviewsPerDayInLastOneWeek,
                  
                datasets: [
                  {
                    label: "Count",
                    backgroundColor: "rgba(75,192,192,1)",
                    data: this.state.reviewsPerDay
                      .dataForReviewsPerDayInLastOneWeek,
                  },
                ],
              }}
              options={{
                title: {
                  display: true,
                  text: "Reviews Per Day (From Last 7 days)",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}
