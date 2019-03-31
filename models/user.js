const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: "String"
    },
    date: {
      type: "String"
    },
    token: {
      type: "String"
    }
  },
  { strict: false, versionKey: false }
);
module.exports = mongoose.model("user", userSchema);
