# Netfix-GPT-Backend
1. Create a base project and added express.
2. Connected mongoDB using mongoose package.

# Routes 
1. /auth/signup
  - Using mongoose model to create schema for user and handled validations for the same.
  - Bcrypt for hashing password and storing it in users collection.
2. /auth/login
  - Handled validations using mongoose schema and validator.js package.
  - Check whether the credentials are present in mongo.
  - Validate password using bcrypt.compare().
  - Create a token using JWT and set the token expiry to 1 day.
  - Attach the token inside a cookie and send it to the client.
