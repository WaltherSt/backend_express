import { Router } from "express";
import { check } from "express-validator";
import {
	createProduct,
	deleteById,
	getById,
	getProducts,
	updateProduct,
} from "../controllers/product.controller";
import { validateFields } from "../middlewares/validate_fields";

const routerProduct = Router();

routerProduct.post("/", [
	check("name", "el nombre del prodecto es obligatorio")
		.not()
		.isEmpty(),

	check("sku", "el sku del producto es obligatorio").not().isEmpty(),
	check("cant", "el numero de unidades del prodecto es obligatorio")
		.not()
		.isEmpty()
		.isNumeric(),

	check("price", "El precio es obligatorio")
		.not()
		.isEmpty()
		.isNumeric(),
	validateFields,
]);

routerProduct.post("/", createProduct);
routerProduct.get("/", getProducts);
routerProduct.get("/:id", getById);
routerProduct.delete("/:id", deleteById);
routerProduct.put("/:id", updateProduct);

export default routerProduct;
