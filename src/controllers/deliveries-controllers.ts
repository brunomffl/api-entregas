import { Request, Response } from "express";

class DeliveriesController {

    async create(req: Request, res: Response){
        return res.json({ message: "caiu no create do delivery" })
    }
}
export { DeliveriesController };