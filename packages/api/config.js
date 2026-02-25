require("dotenv").config();

module.exports = {
  server: {
    //the server info for the api
    hostname: process.env.HOSTNAME || "localhost",
    port: parseInt(process.env.PORT || "3001", 10),
    //the secret key for the server
    secretKey: Buffer.from(
      process.env.SECRET_KEY || "xT1tdO3CfMH01pjxC+guN1LWSt2nKvr5td6KUpw7Czg=",
      "base64",
    ),
    //an artificial delay (in ms) to add to all responses
    artificialDelay: parseInt(process.env.ARTIFICIAL_DELAY || "0", 10),
  },
  database: {
    //the database server info
    hostname: process.env.DB_HOSTNAME || "localhost",
    port: parseInt(process.env.DB_PORT || "3306", 10),
    //the authentication info for the database
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "", //!!!CHANGE ME!!!
    //the database in which to store the data
    database: process.env.DB_NAME || "todo",
    //true to automatically setup the DB tables
    autoInit: process.env.DB_AUTO_INIT === "true",
  },
  // CORS configuration
  allowedOrigins: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : [
        "http://localhost:8081",
        "http://127.0.0.1:5500",
        "http://localhost:5500",
      ],
  //the lifetime of an auth token
  tokenLifetime: 24 * 60 * 60 * 1000,
};
