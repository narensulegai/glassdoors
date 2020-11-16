const { Review } = require("./mongodb");

// {
//     "helpfulVotes": [],
//     "overallRating": 5,
//     "headline": "asa",
//     "description": "asas",
//     "pros": "as",
//     "cons": "asas",
//     "recommendToFriend": true,
//     "company": {
//         "$oid": "5fb0b54bcbf5e705d4281b22"
//     },
//     "employee": {
//         "$oid": "5fb0b066cbf5e705d4281b21"
//     },
//     "createdAt": {
//         "$date": "2020-11-15T05:03:07.973Z"
//     },
//     "updatedAt": {
//         "$date": "2020-11-15T05:03:07.973Z"
//     },
//     "__v": 0
// }

const mongoose = require('mongoose');


const DB_HOST='127.0.0.1';
const DB_PORT='27017';
const DATABASE_NAME='yelp';

const databaseConnectionString =  `mongodb://${DB_HOST}:${DB_PORT}`;

console.log(databaseConnectionString);


mongoose.connect("mongodb://localhost:27017", {poolSize: 30});

// for(let i = 0; i < 10000 ; i++) {
     Review.create({
        company: "5fb0b54bcbf5e705d4281b22",
        employee: "5fb0b066cbf5e705d4281b21",
        helpfulVotes: [],
        overallRating: 5,
        headline: "asa",
        description: "asas",
        pros: "as",
        cons: "asas",
        recommendToFriend: true,
    });
    
