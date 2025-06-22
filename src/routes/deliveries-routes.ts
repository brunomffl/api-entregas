//somente usuários com role SALE podem acessar essas rotas
import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controllers";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorizations } from "@/middlewares/verifyUserAuthorization";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();


deliveriesRoutes.use(ensureAuthenticated);
deliveriesRoutes.use(verifyUserAuthorizations(["sale"])); //somente role de sale pode acessar essa rota
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);

export { deliveriesRoutes }