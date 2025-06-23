//somente usuários com role SALE podem acessar essas rotas
import { Router } from "express";
import { DeliveriesController } from "@/controllers/deliveries-controllers";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorizations } from "@/middlewares/verifyUserAuthorization";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController()

deliveriesRoutes.use(ensureAuthenticated);
deliveriesRoutes.use(verifyUserAuthorizations(["sale"])); //somente role de sale pode acessar essa rota
deliveriesRoutes.post("/", deliveriesController.create);
deliveriesRoutes.get("/", deliveriesController.index);

deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update); // patch usamos pra quando vamos atualizar uma unica coisa

export { deliveriesRoutes }