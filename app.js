// require database connection 
const { connect } = require("mongoose");
const dbConnect = require("./dbconnect");
const app = require("express")


const PORT = process.env.PORT || 3006;

app.listen(PORT, console.log(`Server running on PORT ${PORT}`));

// execute database connection 
dbConnect();