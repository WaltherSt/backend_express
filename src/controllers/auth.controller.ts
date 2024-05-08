import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import generateJWT from "../helpers/jwt";
import UsuarioModel from "../models/usuario.model";

export const login = async (req: Request, res: Response) => {
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
