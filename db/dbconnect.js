// external imports
const mongoose = require("mongoose");
require("dotenv").config();

// async function dbConnect() {
//   // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
//   mongoose
//     .connect(
//         process.env.DB_URL,
//       {
//         //   these are options to ensure that the connection is done properly
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         createIndexes: true,   // Add this line
//       }
//     )
//     .then(() => {
//       console.log("Successfully connected to MongoDB Atlas!");
//     })
//     .catch((error) => {
//       console.log("Unable to connect to MongoDB Atlas!");
//       console.error(error);
//     });
// }

const dbConnect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://new-snart-db:Tnw7xvy63aj3h5R1@cluster0.c9srznh.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
      }
    );

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = dbConnect;
