import express from "express";
import AuthController from "../controllers/AuthController";
//extraimos a função middleware check do express-validator
import { check } from "express-validator";
const router = express.Router();

//importamos middlewares nossos middlewares
//import authMiddleware from "../middleware/authMiddleware"
import roleMiddleware from "../middleware/roleMiddleware";

/*
  Instalamos o express-validator e configuramos como middleware
  para validar os campos
*/
//router.post('/registration', AuthController.registration)
router.post(
  "/registration",
  [
    check("username", "Username can't be empty").notEmpty(),
    check(
      "password",
      "Password must be more than 4 and less than 10 characters."
    ).isLength({ min: 4, max: 10 }),
  ],
  AuthController.registration
);

router.post("/login", AuthController.login);

//router.get('/users', AuthController.getUsers);
//router.get('/users', authMiddleware, AuthController.getUsers);
router.get("/users", roleMiddleware(["ADMIN", "USER"]), AuthController.getUsers);

export default router;
