import express from "express";

import jwt from "jsonwebtoken";
import AuthService from "../services/AuthService";
import { User } from "../models/User";
import { Role } from "../models/Role";
import { validationResult } from "express-validator";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();

/*
  recebe o id do user e roles para
  esconder a informação (payload)

*/
const generateAcessToken = (id: string, roles: string[]) => {
  const payload = {
    id,
    roles,
  };
  /*
    primeiro será o payload, e o segundo será a nossa palavra segreda
    que podemos armazenar num ficheiro a parte.
    Será esta palavra que o token será desencriptado
    Se roubarem o nosso token, só podem usar durante 24h
  */
  return jwt.sign(payload, String(process.env.SECRET_KEY), {
    expiresIn: "24h",
  });
};

class AuthController {
  async registration(req: express.Request, res: express.Response) {
    try {
      /*
        recibemos os erros do validator mandando o nosso request,
        caso não haver nenhum, continua o registo
      */
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res
          .status(500)
          .json({ message: "Error during registration.", errors });
      }

      // caso encontramos a pessoa com username igual
      const candidate = await AuthService.foundUser(req.body);

      if (candidate) {
        return res.status(500).json({ message: "Username already exists." });
      }

      const createdUser = await AuthService.registration(req.body);

      return res.json({ message: "User created", createdUser });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      res.status(500).json("Registration failed.");
    }
  }

  async login(req: express.Request, res: express.Response) {
    try {
      const { username, password } = req.body;

      const foundUser = await AuthService.login(username, password);

      return res.json({ message: "Login success", foundUser });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      res.status(500).json("Login failed");
    }
  }

  async getUsers(req: any, res: express.Response) {
    try {
      console.log(req.user);
      const users = await AuthService.getAllUsers();

      res.json(users);
    } catch (e: unknown) {
      if (e instanceof Error) {
        res.status(500).json(e.message);
      }
    }
  }
}

// default permite dar o nome personalizado da importação
export default new AuthController();
import { UserType } from "./../models/User";
