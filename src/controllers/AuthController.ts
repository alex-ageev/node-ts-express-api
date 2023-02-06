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
      const { username, password } = req.body;
      const createdUser = await AuthService.registration(username, password);

      res.cookie("refreshToken", createdUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        // secure: true caso esteijam usar https
      });

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
      res.cookie("refreshToken", foundUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json({ message: "Login success", foundUser });
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      res.status(500).json("Login failed");
    }
  }
  async logout(req: express.Request, res: express.Response) {
    try {
      console.log(req.cookies);
      if (!req.cookies.refreshToken) {
        return res.status(400).json({ message: "Refresh token not found" });
      }
      const { refreshToken } = req.cookies;
      const token = await AuthService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token); // podiamos enviar apenas status 200
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      res.status(500).json("Logout failed");
    }
  }

  async refresh(req: express.Request, res: express.Response) {
    try {
      if (!req.cookies.refreshToken) {
        return res.status(400).json({ message: "Refresh token not found" });
      }
      const { refreshToken } = req.cookies;

      const foundUser = await AuthService.refresh(refreshToken);
      res.cookie("refreshToken", foundUser.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });

      return res.json(foundUser);
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(e.message);
      }
      res.status(500).json("Refresh token failed");
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

