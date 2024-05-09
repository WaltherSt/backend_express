//path /api/v1/user

import { Router } from "express";
import { check } from "express-validator";
import {
	cambioContrasena,
	login,
	olvido_de_contrasena,
} from "../controllers/auth.controller";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

const authRouter = Router();

authRouter.post(
	"/",
	[
		check("email", "el email es obligatorio").not().isEmpty(),
		check("password", "El password es obligatorio")
			.not()
			.isEmpty(),

		validateFields,
	],
	login
);

authRouter.post(
	"/olvidocontrasena",
	[
		check("email", "el email es obligatorio")
			.not()
			.isEmpty()
			.isEmail(),
		check(
			"documentNumber",
			"el numero de documento es obligatorio"
		)
			.not()
			.isEmpty(),
		validateFields,
	],
	olvido_de_contrasena
);

authRouter.put(
	"/cambiocontrasena",
	validateJWT,
	[check("password", "la contraseña es obligatoria").not().isEmpty()],
	cambioContrasena
);

export default authRouter;
