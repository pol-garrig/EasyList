var mongoose = require('mongoose');

module.exports = mongoose.model('Item', {
	text : {type : String, default: ''},
	closed : {type : Boolean, default: false}
});