import express from "express";
import ProductController from "../controllers/ProductController";

/*
    Criamos uma instância de um router Express e definimos as rotas da aplicação.
*/
const router = express.Router();

/*
As rotas estão associadas às suas respectivas
funções no controlador "ProductController" para
lidar com as operações CRUD.
*/
router.post("/products", ProductController.create);
router.get("/products", ProductController.getAll);
router.get("/products/:id", ProductController.getOne);
router.put("/products", ProductController.update);
router.delete("/products/:id", ProductController.delete);

export default router;
