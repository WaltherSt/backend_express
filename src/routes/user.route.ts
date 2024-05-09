import { Router } from "express";
import { check } from "express-validator";
import {
	createUser,
	deleteById,
	getById,
	getUsers,
	updateUser,
} from "../controllers/user.controller";
import { validateFields } from "../middlewares/validate_fields";
import { validateJWT } from "../middlewares/validate_jwt";

//path /api/v1/user

const router = Router();

router.post(
	"/",
	[
		check("name", "el nombre es obligatorio").not().isEmpty(),
		check("email", "El correo debe ser unico")
			.not()
			.isEmpty()
			.isEmail(),
		check(
			"documentType",
			"El numero de documento es obligatorio"
		)
			.not()
			.isEmpty(),
		validateFields,
	],
	createUser
);
router.get("/", validateJWT, getUsers);
router.get("/:id", validateJWT, getById);
router.delete("/:id", validateJWT, deleteById);
router.put("/:id", validateJWT, updateUser);

export default router;
