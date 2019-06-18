const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRouter = require("./route/auth");
const tokenRouter = require("./route/token");
const bodyParser = require("body-parser");
const app = express();
app.use(cors({ credentials: true, origin: true }));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use("", authRouter);
app.use("", tokenRouter);

mongoose
  .connect("mongodb://157.230.163.221:17017/entrance", {
    useNewUrlParser: true
  })
  .then(result => {
    app.listen(3500);
  })
  .catch(err => console.log(err));
