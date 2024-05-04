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

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await UsuarioModel.find();
		res.status(200).json({
			ok: true,
			msg: "Lista de usuarios",
			users,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al consultar los usuarios",
		});
	}
};

export const getById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user = await UsuarioModel.findById({ _id: id });

		res.status(200).json({
			ok: true,
			msg: "usuario",
			user,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Usuario no encontrado",
			error,
		});
	}
};

export const deleteById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const user = await UsuarioModel.findByIdAndDelete({
			_id: id,
		});

		res.status(200).json({
			ok: 200,
			msg: "usuaio eliminado",
			user,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al eliminar usuario",
			error,
		});
	}
};

export const updateUser = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const user = req.body;

		const userUpdated = await UsuarioModel.findByIdAndUpdate(
			id,
			user,
			{
				new: true,
			}
		);
		res.status(200).json({
			ok: true,
			userUpdated,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al actualizar",
		});
	}
};
