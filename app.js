// require database connection
const dbConnect = require("./db/dbconnect");
const express = require('express');

const app = express();

const PORT = process.env.PORT || 3006;

// execute database connection
dbConnect();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
