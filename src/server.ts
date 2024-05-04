// Importaciones de módulos y dependencias necesarias
import cors from "cors"; // Middleware para manejar solicitudes CORS
import express, { Application, Request, Response } from "express"; // Framework web para Node.js
import { db_connection } from "./database/connection"; // Función para establecer la conexión a la base de datos
import routerProduct from "./routes/product.route"; // Importa el enrutador para las rutas de productos
import router from "./routes/user.route"; // Importa el enrutador para las rutas de usuarios

// Definición de la clase Server
class Server {
	private app: Application; // Instancia de Express para la aplicación
	private port: string; // Puerto en el que se ejecutará el servidor

	// Objeto para almacenar las rutas de la API
	private apiPaths = {
		user: "/api/v1/user",
		product: "/api/v1/product",
	};

	// Constructor de la clase Server
	constructor() {
		this.app = express(); // Inicialización de la instancia de Express
		this.port = process.env.PORT ?? "3000"; // Asignación del puerto (obtenido del entorno o predeterminadamente 3000)
		db_connection(); // Llamada a la función para establecer la conexión a la base de datos

		this.middlewares(); // Configuración de los middlewares de la aplicación

		this.routes(); // Configuración de las rutas de la aplicación
	}

	// Método para definir la primera ruta de la API
	miPrimerApi() {
		this.app.get("/", (req: Request, res: Response) =>
			res.status(200).json({ msg: "Api funcionando" })
		);
	}

	// Método para configurar los middlewares de la aplicación
	middlewares() {
		this.app.use(cors()); // Uso del middleware cors para manejar solicitudes CORS
		this.app.use(express.json()); // Uso del middleware para analizar el cuerpo de las solicitudes como JSON
		this.miPrimerApi(); // Llamada al método para definir la ruta de la API
	}

	// Método para configurar las rutas de la aplicación
	routes(): void {
		this.app.use(this.apiPaths.user, router); // Establece las rutas de usuario usando el enrutador de usuarios
		this.app.use(this.apiPaths.product, routerProduct); // Establece las rutas de productos usando el enrutador de productos
	}

	// Método para iniciar el servidor
	listen(): void {
		this.app.listen(this.port, () => {
			console.log(
				"Servidor corriendo por el puerto: ",
				this.port
			);
		});
	}
}

// Exportación de la clase Server para poder utilizarla en otros archivos
export default Server;
