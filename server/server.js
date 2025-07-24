const express = require("express");
const models = require("./models");
const { createHandler } = require("graphql-http/lib/use/express");
const mongoose = require("mongoose");
const schema = require("./schema/schema");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");

const app = express();
app.use(cors());
// Replace with your Mongo Atlas URI
const MONGO_URI = "mongodb://localhost:27017";
if (!MONGO_URI) {
  throw new Error("You must provide a Mongo Atlas URI");
}

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI);
mongoose.connection
  .once("open", () => console.log("Connected to Mongo Atlas instance."))
  .on("error", (error) =>
    console.log("Error connecting to Mongo Atlas:", error)
  );

app.use("/graphql", createHandler({ schema }));
app.get("/graphql-interface", (req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});
module.exports = app;
