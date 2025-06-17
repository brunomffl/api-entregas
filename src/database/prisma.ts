import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    //se estiver em produção não precisa mostrar o log de querys, se não for (ai vai ser desenvolvimento) aí vemos os logs
    log: process.env.NODE_ENV === "production" ? [] : ["query"]

})