import { Router } from "express";
import { sessionsController } from "@/controllers/sessions-controller";

const sessionsRoutes = Router();
const sessionController = new sessionsController();

sessionsRoutes.post("/", sessionController.create);

export { sessionsRoutes }