// require database connection
const dbConnect = require("./db/dbconnect");
const bcrypt = require("bcrypt");
const express = require("express");
const User = require("./db/usermodel");
const jwt = require("jsonwebtoken");

const app = express();

const PORT = process.env.PORT || 3006;

app.use(express.json());

// execute database connection
dbConnect();

app.post("/register", async (req, res) => {
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user instance with hashed password
    const user = new User({
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const result = await user.save();

    // Return success if the new user is added to the database successfully
    res.status(201).send({
      message: "User Created Successfully",
      result,
    });
  } catch (error) {
    // Handle errors gracefully
    console.error("Error during registration:", error);
    res.status(500).send({
      message: "Error creating user",
      error: error.message,
    });
  }
});

// login endpoint
app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })

    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      bcrypt
        .compare(request.body.password, user.password)

        // if the passwords match
        .then((passwordCheck) => {
          // check if password matches
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              //   error,
            });
          }

          //   create JWT token
          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        // catch error if password does not match
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    // catch error if email does not exist
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
