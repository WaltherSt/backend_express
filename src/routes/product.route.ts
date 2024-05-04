import { Router } from "express";
import {
	createProduct,
	deleteById,
	getById,
	getProducts,
	updateProduct,
} from "../controllers/product.controller";

const routerProduct = Router();

routerProduct.post("/", createProduct);
routerProduct.get("/", getProducts);
routerProduct.get("/:id", getById);
routerProduct.delete("/:id", deleteById);
routerProduct.put("/:id", updateProduct);

export default routerProduct;
