import { model, Model, Schema } from "mongoose";

const UsuarioSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	documentType: {
		type: String,
		required: true,
	},
	documentNumber: {
		type: String,
		required: true,
		unique: true,
	},
	phoneNumber: {
		type: Number,
	},
	weight: {
		type: String,
	},
	Birthdate: {
		type: Date,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

const UsuarioModel: Model<any> = model("user", UsuarioSchema);
export default UsuarioModel;
