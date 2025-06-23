import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveryLogsController {
    async create(req: Request, res: Response){
        return res.json({ message: "teste cooper flag" })
    };
};

export { DeliveryLogsController }