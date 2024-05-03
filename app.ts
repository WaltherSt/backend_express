// Importación del módulo dotenv para cargar variables de entorno desde un archivo .env
import dotenv from "dotenv";

// Importación de la clase Server desde el archivo server.ts ubicado en la carpeta src
import Server from "./src/server";

// Carga las variables de entorno definidas en el archivo .env en el proceso de Node.js
dotenv.config();

// Creación de una instancia de la clase Server, que representa nuestro servidor de la API
const server = new Server();

// Inicia el servidor, haciendo que escuche en el puerto definido en la variable de entorno PORT
server.listen();
