import { Product } from "../models/Product";
import mongoose from "mongoose";

class ProductService {
  async create(product: any): Promise<any> {
    const createdProduct = await Product.create(product);
    return createdProduct;
  }

  async getAll(): Promise<any> {
    const allProducts = await Product.find();
    return allProducts;
  }

  async getOne(id: string): Promise<any> {
    if (!id) {
      throw new Error("ID não indicado.");
    }

    const foundProduct = await Product.findById(
      new mongoose.Types.ObjectId(id)
    );
    return foundProduct;
  }

  async update(product: any): Promise<any> {
    if (!product._id) {
      throw new Error("ID não indicado.");
    }

    if (!product.author) {
      throw new Error("Autor não indicado.");
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      product,
      { new: true }
    );

    return updatedProduct;
  }

  async delete(id: string): Promise<any> {
    if (!id) {
      throw new Error("ID não indicado.");
    }

    const deletedProduct = await Product.findByIdAndDelete(
      new mongoose.Types.ObjectId(id)
    );

    return deletedProduct;
  }
}

export default new ProductService();
