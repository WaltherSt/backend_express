// Importación de los tipos Request y Response de Express para el manejo de solicitudes HTTP
import { Request, Response } from "express";

// Importación del modelo UsuarioModel desde el archivo usuario.model ubicado en la carpeta models
import UsuarioModel from "../models/usuario.model";

// Controlador para crear un nuevo usuario
export const createUser = async (req: Request, res: Response) => {
	const { body } = req; // Extracción del cuerpo de la solicitud HTTP

	try {
		// Creación de un nuevo objeto de usuario utilizando el modelo UsuarioModel y los datos del cuerpo de la solicitud
		const newUser = new UsuarioModel({
			...body,
		});

		// Guardar el nuevo usuario en la base de datos
		const user = await newUser.save();

		// Enviar una respuesta HTTP con estado 200 (OK) y un JSON que indica que el usuario ha sido creado
		res.status(200).json({
			ok: true,
			msg: "Usuario creado",
			user,
		});
	} catch (error) {
		// En caso de error durante el proceso de creación del usuario, enviar una respuesta HTTP con estado 400 (Bad Request) y un JSON con el mensaje de error
		res.status(400).json({
			ok: false,
			error,
			msg: "Error al crear el usuario",
		});
	}
};
