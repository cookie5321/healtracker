const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String, // only accept string titles
      required: true, // mandatory field
    },
    reps: {
      type: Number,
      required: true,
    },
    load: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // automatically attach when the document is created and updated
  },
);

module.exports = mongoose.model("Workout", workoutSchema);

// workoutSchema = 'schema', the structure of a document
// mongoose.model() = 'model', allowing actual interaction with a document
