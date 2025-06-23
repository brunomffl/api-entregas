import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesStatusController{
    async update(req: Request, res: Response){
        const paramsSchema = z.object({
            id: z.string().uuid(), //id do envio a ser atualizado
        });

        const bodySchema = z.object({
            status: z.enum(["processing", "shipped", "delivered"])
        });

        const { id } = paramsSchema.parse(req.params);
        const { status } = bodySchema.parse(req.body);

        await prisma.delivery.update({
            data: {
                status,
            },
            where: {
                id,
            },
        });

        return res.json();
        
    };
};

export { DeliveriesStatusController };