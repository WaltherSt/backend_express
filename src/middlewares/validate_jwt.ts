import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
	_id?: number;
}

export const validateJWT = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No hay token en la petición",
		});
	}

	try {
		const secret = process.env.JWT_SECRET_PASS as string;
		const { _id } = jwt.verify(token, secret) as JwtPayload;
		req._id = _id;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "Token invalido",
		});
	}
};

export const validateJWTPass = (
	req: CustomRequest,
	res: Response,
	next: NextFunction
) => {
	const token = req.header("x-token-pass") as string;

	if (!token) {
		return res.status(401).json({
			ok: false,
			msg: "No hay token en la petición",
		});
	}
	try {
		const secret = process.env.JWT_SECRET_PASS as string;
		const { _id } = jwt.verify(token, secret) as JwtPayload;
		req._id = _id;
		next();
	} catch (error) {
		return res.status(401).json({
			ok: false,
			msg: "Token invalido",
			token,
		});
	}
};
