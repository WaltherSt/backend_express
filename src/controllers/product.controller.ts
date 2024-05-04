import { Request, Response } from "express";
import ProductModel from "../models/product.model";

export const createProduct = async (req: Request, res: Response) => {
	const body = req.body;

	try {
		const newProduct = new ProductModel({
			...body,
		});
		const product = await newProduct.save();

		res.status(200).json({
			ok: true,
			msg: "Producto creado",
			product,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al crear producto",
			error,
		});
	}
};

export const getProducts = async (req: Request, res: Response) => {
	try {
		const products = await ProductModel.find();
		res.status(200).json({
			ok: true,
			msg: "Lista de productos",
			products,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al consultar los productos",
		});
	}
};

export const getById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const product = await ProductModel.findById({ _id: id });

		res.status(200).json({
			ok: true,
			msg: "producto",
			product,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Producto no encontrado",
			error,
		});
	}
};

export const deleteById = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;

		const product = await ProductModel.findByIdAndDelete({
			_id: id,
		});

		res.status(200).json({
			ok: 200,
			msg: "producto eliminado",
			product,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al eliminar producto",
			error,
		});
	}
};

export const updateProduct = async (req: Request, res: Response) => {
	try {
		const id = req.params.id;
		const product = req.body;

		const userUpdated = await ProductModel.findByIdAndUpdate(
			id,
			product,
			{
				new: true,
			}
		);
		res.status(200).json({
			ok: true,
			msg: "Producto actualizado",
			userUpdated,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "Error al actualizar producto",
			error,
		});
	}
};
