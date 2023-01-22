import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
/*

Middleware é um componente intermediário entre a request do cliente e a função que processa essa solicitação no servidor. Pode ser usado para verificar o request, autorizar utilizadores, modificar dados do request, entre outras coisas. Pode haver vários middlewares que são chamados sequencialmente antes de chegar à função de processamento da solicitação. É uma boa prática usar middlewares para separar a lógica de autorização e validação dos dados da lógica de processamento.


Alguns exemplos de uso incluem verificar se o utilizador está autenticado antes de permitir que ele acesse uma rota específica ou verificar se um determinado parametro foi fornecido antes de processar a solicitação.
*/
import { Request, Response, NextFunction } from "express";

/*
  Só podem aceder os utilizadores logados
*/
interface TokenPayload {
  roles: string[];
}

export default (req: any, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  // O header tem Bearer (tipo de token) e ASdqwefwrir (token)
  // tiramos o token do header
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "No authorization header" });
  }
  /*
    como só nos interesa o token e não o tipo, separamos a string em 2 partes
  */
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    /*
      caso o token veio no header, precisamos de descodificar

    */
    const decoded = jwt.verify(
      token,
      String(process.env.SECRET_KEY)
    ) as TokenPayload;
    /*
      neste momento temos o objeto com o id e as roles
      (aquele payload que nos enviamos na função generateAccessToken)
    */
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (e) {
    console.error(e);
    return res.status(401).json({ message: "Bad format token" });
  }
};
