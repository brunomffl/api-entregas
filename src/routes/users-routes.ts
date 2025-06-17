import { Router } from "express";
import { UsersController } from "@/controllers/user-controllers";

const usersRoutes = Router();
const usersControllers = new UsersController();

//criando as rotas de usuário
usersRoutes.post("/", usersControllers.create);

export { usersRoutes };