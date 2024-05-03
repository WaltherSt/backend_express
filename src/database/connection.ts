// Importación del módulo mongoose para interactuar con la base de datos MongoDB
import mongoose from "mongoose";

// Exportación de la función db_connection como una función asíncrona
export const db_connection = async () => {
	try {
		// Obtención de la URL de conexión a la base de datos desde la variable de entorno DB_CONNECTION
		const db_url = process.env.DB_CONNECTION;

		// Verificación de que la URL de conexión existe
		if (!db_url) {
			// Lanza un error si la URL de conexión no está definida en las variables de entorno
			throw new Error(
				"error en la conexión de la base de datos, no existe la URL"
			);
		}

		// Intenta conectarse a la base de datos utilizando la URL obtenida
		await mongoose.connect(db_url);

		// Si la conexión es exitosa, registra un mensaje indicando que la base de datos está en línea
		console.log("DB online");
	} catch (error: any) {
		// Captura cualquier error que ocurra durante el proceso de conexión
		console.log(error.errmsg); // Registro del mensaje de error específico proporcionado por Mongoose (si hay alguno)
		console.log("Error en la conexión de la base de datos"); // Mensaje de registro genérico indicando un error de conexión
	}
};
