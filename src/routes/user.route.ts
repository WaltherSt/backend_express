import { Router } from "express";
import {
	createUser,
	deleteById,
	getById,
	getUsers,
	updateUser,
} from "../controllers/user.controller";

//path /api/v1/user

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getById);
router.delete("/:id", deleteById);
router.put("/:id", updateUser);

export default router;
