import { Router } from "express";
import { createUser } from "../controllers/user.controller";

//path /api/v1/user

const router = Router();

router.post("/", createUser);

export default router;
