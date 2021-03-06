const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    id: {
      type: "String"
    },
    name: {
      type: "String"
    },
    password: {
      type: "String"
    },
    email: {
      type: "String"
    },
    token: {
      type: "String"
    }
  },
  { strict: false, versionKey: false }
);
module.exports = mongoose.model("user", userSchema);
