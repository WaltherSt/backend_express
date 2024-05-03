// Importación de los elementos necesarios de Mongoose: model, Model y Schema
import { model, Model, Schema } from "mongoose";

// Definición del esquema de usuario utilizando el constructor Schema de Mongoose
const UsuarioSchema = new Schema({
	// Definición de los campos del esquema de usuario con sus respectivos tipos y restricciones
	name: {
		type: String,
		required: true, // Campo obligatorio
	},
	email: {
		type: String,
		required: true, // Campo obligatorio
		unique: true, // Valor único, no se permiten duplicados
	},
	documentType: {
		type: String,
		required: true, // Campo obligatorio
	},
	documentNumber: {
		type: String,
		required: true, // Campo obligatorio
		unique: true, // Valor único, no se permiten duplicados
	},
	phoneNumber: {
		type: Number, // Tipo numérico (opcional)
	},
	weight: {
		type: String, // Tipo de cadena de caracteres (opcional)
	},
	Birthdate: {
		type: Date, // Tipo fecha (opcional)
	},
	createdAt: {
		type: Date,
		default: Date.now(), // Valor por defecto: fecha y hora actual
	},
});

// Creación del modelo UsuarioModel utilizando el método model de Mongoose
const UsuarioModel: Model<any> = model("users", UsuarioSchema);

// Exportación del modelo UsuarioModel para que esté disponible en otros archivos
export default UsuarioModel;
