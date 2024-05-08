//path /api/v1/user

import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers/auth.controller";
import { validateFields } from "../middlewares/validate_fields";

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

export default authRouter;
