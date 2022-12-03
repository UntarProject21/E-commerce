const mongoose = require('mongoose');
var Schema = mongoose.Schema

userSchema = new Schema( {	
	firstName: String,
	lastName: String,
	email: String,
	password: String,
	passwordConf: String
}),
User = mongoose.model('User', userSchema);

module.exports = User;