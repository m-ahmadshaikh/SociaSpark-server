var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: String,
});

// This creates our model from the above schema, using mongoose's model method
const User = mongoose.model('User', userSchema);

// Export the Article model
module.exports = User;
