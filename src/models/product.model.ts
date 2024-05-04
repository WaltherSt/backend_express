import { model, Model, Schema } from "mongoose";

const ProductSchema = new Schema({
	name: {
		type: String,
		require: true,
	},
	sku: {
		type: String,
		require: true,
	},
	cant: {
		type: Number,
		require: true,
	},
	price: {
		type: Number,
		require: true,
	},
});

const ProductModel: Model<any> = model("products", ProductSchema);

export default ProductModel;
