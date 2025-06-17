import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/AppError";
import { authConfig } from "@/config/auth";
import { z } from "zod";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken"

class sessionsController {
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            email: z.string().email(),
            password: z.string().min(6)
        });

        const { email, password } = bodySchema.parse(req.body);

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });

        if(!user){
            throw new AppError("Email ou senha inválido", 401);
        }

        const passwordMatched = await compare(password, user.password); //compara a senha que veio no corpo da requisição com a senha do usuário que recuperamos do banco de dados

        if(!passwordMatched){
            throw new AppError("Email ou senha inválido", 401);
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({ role: user.role ?? "customer" }, secret, {
            subject: user.id,
            expiresIn
        });

        const { password: hashedPassword, ...userWithoutPassword } = user;

        return res.json({ token, ...userWithoutPassword });
    }
}

export { sessionsController }