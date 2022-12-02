const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
	category: {
		type: String,
	},
  image: {
    type: String,
  },
  variety: [		
    {
			size_id: String,
			size: String,
			stock: Number,
    },
    {
			size_id: String,
			size: String,
			stock: Number,
			//required: true
    },
		{
			size_id: String,
			size: String,
			stock: Number,
			//required: true
		}
  ]
});

const product = mongoose.model("Product", productSchema);

module.exports = product;
