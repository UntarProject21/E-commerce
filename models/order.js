const mongoose = require('mongoose');
var Schema = mongoose.Schema

orderSchema = new Schema( {	
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    regency: String,
    province: String,
    zipcode: String,
    cardName: String,
    creditNumber: String,
    expMonth: String,
    expYear: String,
    cvv: String,
}),
Order = mongoose.model('Order', orderSchema);

module.exports = Order;