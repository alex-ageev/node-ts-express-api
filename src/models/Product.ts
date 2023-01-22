import mongoose from "mongoose";

/*
Esta função cria um esquema de Mongoose
para o objeto "Product".

O esquema é criado utilizando
o construtor "mongoose.Schema"
e especificando os campos que
o objeto "Product" deve ter.
*/

const ProductSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  picture: { type: String },
});

/*
Uma interface "ProductType" é criada,
que estende a classe "mongoose.Document"
e especifica os campos que um objeto "Product" deve ter.
*/
export interface ProductType extends mongoose.Document {
  author: string;
  title: string;
  content: string;
  picture: string;
}

/*
Este modelo pode ser usado
para criar, ler, atualizar
e apagar objetos "Product" na MongoDB.
*/
export const Product = mongoose.model<ProductType>("Product", ProductSchema);
