const mongoose = require('mongoose');
const Schema = mongoose.Schema;


/* ==================
 * Todo Schema
 * ==================*/
const TodoSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    }
  },
  {versionKey: false}  
);

module.exports = mongoose.model('Todo', TodoSchema);
