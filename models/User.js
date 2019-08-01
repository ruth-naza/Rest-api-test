const mongoose = require('mongoose');


const UserSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
	lastname: {
    type: String,
    required: true
  },
	gender: {
    type: String,
    required: true
  },
  date_of_birth: {
    type: String,
    required: true
  },
  date_created: {
    type: Date,
    default: Date.now
  },
  date_updated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema)
