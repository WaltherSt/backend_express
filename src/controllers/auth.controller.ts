import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import { body } from "express-validator";
import generateJWT from "../helpers/jwt";
import { CustomRequest } from "../middlewares/validate_jwt";
import UsuarioModel from "../models/usuario.model";

export const auth = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const user = await UsuarioModel.findOne({ email: email });

		if (!user) {
			return res.status(401).json({
				ok: false,
				msg: "El correo o la contraseña no son correctas",
			});
		}

		const validUser = bcrypt.compareSync(
			password,
			user.password
		);

		if (!validUser) {
			return res.status(401).json({
				ok: false,
				msg: "El correo o la contraseña no son correctas",
			});
		}

		const token = await generateJWT(user._id, user.email);

		res.status(200).json({
			ok: true,
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			error,
			msg: "Hable con el administrador",
		});
	}
};

export const olvido_de_contrasena = async (req: Request, res: Response) => {
	const { email, documentNumber } = req.body;
	console.log(body);

	try {
		const existeUsuario = await UsuarioModel.findOne({
			email,
			documentNumber,
		});

		if (!existeUsuario) {
			res.status(400).json({
				ok: false,
				msg: "Usuario no encontrado",
			});
		}

		const id = existeUsuario?._id;

		if (id) {
			//generar token
			const token = await generateJWT(
				id,
				email,
				"1h",
				process.env.JWT_SECRET_PASS
			);

			res.status(200).json({
				ok: true,
				msg: "proceso exitoso",
				user: existeUsuario,
				token,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({
			ok: false,
			msg: "No se logró validar sus datos",
		});
	}
};

export const cambioContrasena = async (req: CustomRequest, res: Response) => {
	const id = req._id;
	const { password } = req.body;

	try {
		if (!password) {
			res.status(400).json({
				ok: false,
				msg: "Por favor digite una contraseña válida",
			});
		}

		const newPassword = bcrypt.hashSync(password, 10);

		const actualizarPassword =
			await UsuarioModel.findByIdAndUpdate(
				id,
				{
					password: newPassword,
				},
				{ new: true }
			);

		if (!actualizarPassword) {
			res.status(400).json({
				ok: false,
				msg: "Error al actualizar la contraseña",
			});
		}

		res.status(200).json({
			ok: true,
			msg: "contraseña actualizada",
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al actualizar la contraseña, hable con el administrador",
		});
	}
};
