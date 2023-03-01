const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes/index");

require("dotenv").config();

const port = process.env.SERVER_PORT || 4000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Starting points for the routes
app.use("/api/", routes);

app.listen(port, () => {
  console.info(`Server started on port ${port}`);
});
