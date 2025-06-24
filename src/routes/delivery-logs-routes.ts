import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorizations } from "@/middlewares/verifyUserAuthorization";
import { DeliveryLogsController } from "@/controllers/delivery-logs-controllers";


const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

//somente o vendedor (sale) pode criar porém todos os usuários podem ver a listagem
deliveryLogsRoutes.post("/",ensureAuthenticated, verifyUserAuthorizations(["sale"]), deliveryLogsController.create);
deliveryLogsRoutes.get("/:delivery_id/show", ensureAuthenticated, verifyUserAuthorizations(["sale", "customer"]), deliveryLogsController.show);

export { deliveryLogsRoutes };