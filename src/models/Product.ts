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
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number },
  picture: { type: String },
  createdAt: { type: Date, default: Date.now() }
});

/*
Uma interface "ProductType" é criada,
que estende a classe "mongoose.Document"
e especifica os campos que um objeto "Product" deve ter.
*/
export interface ProductType extends mongoose.Document {
  name: string;
  description: string;
  price: number;
  quantity: number;
  picture: string;
  createdAt: Date;
}


/*
Este modelo pode ser usado
para criar, ler, atualizar
e apagar objetos "Product" na MongoDB.
*/
export const Product = mongoose.model<ProductType>("Product", ProductSchema);
