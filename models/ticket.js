const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ticketSchema = new Schema(
  {
    _id: {
      type: "String"
    },
    type: {
      type: "String"
    },
    from: {
      type: "String"
    },
    to: {
      type: "String"
    },
    user_id: {
      type: "String"
    }
  },
  { strict: false, versionKey: false }
);
module.exports = mongoose.model("tickets", ticketSchema);
