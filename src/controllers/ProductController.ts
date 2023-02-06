import express from "express";
import { Product } from "../models/Product";
import ProductService from "../services/ProductService";

/*
Contém métodos para lidar com operações CRUD para objetos "Product".
*/
class ProductController {
  /*
        Este método utiliza o método "create" do "ProductService"
        para criar um novo objeto "Product"
        com os dados enviados na solicitação
        e retorna o objeto criado na resposta.
    */
  async create(req: express.Request, res: express.Response) {
    try {
      //console.log(req.files);
      console.log(req.body)
      console.log(req.files)
      const createdProduct = await ProductService.create(req.body);
      res.json(createdProduct);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json(e.message);
      }
    }
  }
  /*
        Este método utiliza o método "getAll" para obter
        os objetos "Product" na base de dados
        e retorna-os na resposta.
    */
  async getAll(req: express.Request, res: express.Response) {
    try {
      const allProducts = await ProductService.getAll();
      return res.json(allProducts);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json(e.message);
      }
    }
  }
  /*
    Este método utiliza o método "getOne"
    para obter um objeto "Product"
    específico na bd com o ID fornecido
    na solicitação e retorna-o na resposta.
    */
  async getOne(req: express.Request, res: express.Response) {
    try {
      const foundProduct = await ProductService.getOne(req.params.id);
      return res.json(foundProduct);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json(e.message);
      }
    }
  }
  /*
    Este método utiliza o método "update"
    para atualizar um objeto "Product"
    específico com os dados enviados na
    solicitação e retorna o
    objeto atualizado na resposta.
    */
  async update(req: express.Request, res: express.Response) {
    try {
      const updatedProduct = await ProductService.update(req.body);
      return res.json(updatedProduct);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json(e.message);
      }
    }
  }
  /*
    Este método utiliza o método "findByIdAndDelete"
    para excluir um objeto "Product"
    específico na bd com o ID fornecido na
    solicitação e retorna o
    objeto excluído na resposta.
    */
  async delete(req: express.Request, res: express.Response) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);

      return res.json(deletedProduct);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(400).json(e.message);
      }
    }
  }
}

// default permite dar o nome personalizado da importação
export default new ProductController();
