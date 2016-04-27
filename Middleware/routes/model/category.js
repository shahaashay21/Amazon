var mongoose = require('mongoose');

var categorySchema = mongoose.Schema({
	cat_id: {
		type: Number, 
		required: true, 
		index: true
	},
	name: {type: String, required: true},
	parent_cat_id: {
		type: Number,
		ref: 'Category.cat_id'
	}
},
{
	collection: 'category',
    versionKey: false
});

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
