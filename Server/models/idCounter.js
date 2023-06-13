const mongoose = require("mongoose");

const idCounterSchema = new mongoose.Schema({
  counter: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("IdCounter", idCounterSchema);
