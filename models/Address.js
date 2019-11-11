const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AddressSchema = new Schema({
	street: {
		type: String,
		required: true
	},
	address1: {
		type: String,
		required: true
	},
	address2: {
		type: String,
		required: false
	},
	suburb: {
		type: String,
		required: true
	},
	town: {
		type: String,
		required: true
	},
	user_id: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const Address = mongoose.model('addresses', AddressSchema);

module.exports = Address;