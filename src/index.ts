// precisamos de importar o Express e Mongoose
import express from "express";
import mongoose from "mongoose";
import productRouter from "./routers/productRouter";
import authRouter from "./routers/authRouter";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";

dotenv.config();

// Indicamos a porta
const PORT: number = Number(process.env.PORT) || 8000;
const DB_URL: string = String(process.env.MONGO_URI);
// chamamos a função express
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
app.use("/api", productRouter);
app.use("/auth", authRouter);


const connectToDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(DB_URL);
    console.log("Successfully connected to the database.");
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};
// criarmos a função da nossa App
const startApp = async () => {
  try {
    connectToDb();
    /*
            Chamamos a função listen e passamos a porta como primeiro parametro
            A função irá mostrar a mensagem caso o servidor inicia com sucesso.
        */
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      console.log(e.message);
    }
  }
};

startApp();

// /*
//     Um endpoint que irá tratar um get request
//     Como parametros, ele aceita req e res.
// */
app.get("/", (req: express.Request, res: express.Response) => {
  /*
        Na resposta, chamamos a função status, indicamos 200 (success)
        e chamamos a função json onde podemos enviar qualquer dados.
    */
  res.status(200).json("Servidor funciona!");
});

/*
Vamos criar uma aplicação em Node.js com TypeScript e Express
que utiliza o MongoDB através do Mongoose para criar, ler, atualizar
e apagar os produtos.

A aplicação irá ter rotas para criar, ler,
atualizar e apagar produtos, que serão controladas
por um controlador de produto (ProductController) e um
serviço de produto (ProductService).

O ProductController irá usar as funções
do ProductService para lidar com operações CRUD,
e as rotas serão geridas por um router.

Um produto irá ter o seguinte formato:
{
    "author": "João",
    "title": "Edit Aula Express",
    "content": "algum content",
}
*/
