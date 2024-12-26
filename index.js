const express = require('express');
const mongoDB = require('./config/mongo');
const app = express();
const authRouter = require('./routes/auth')

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse URL-encoded bodies (usually from forms)
app.use(express.urlencoded({ extended: true }));

app.use("/", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Allow only your frontend
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow cookies if needed

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  next();
});

app.use('/auth',authRouter)

const mongoConnect = async () => {
    try{
        await mongoDB();
        console.log("Database connection Established!!🚀🚀");
        app.listen(8000,() => {
            console.log(`Server started at http://localhost:8000 🚀🚀`);
        })
    }catch(err){
        console.log("Database connection failed!!🚀🚀");
    }
}

mongoConnect()