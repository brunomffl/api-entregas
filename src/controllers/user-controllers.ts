import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { hash } from "bcrypt"
import { z } from "zod";
import { AppError } from "@/utils/AppError";

class UsersController {
    async create(req: Request, res: Response){
        const bodySchema = z.object({
            name: z.string().trim().min(3, { message: "O nome deve ter no mínimo 3 caracteres!" }),
            email: z.string().email({ message: "E-mail inválido!" }),
            password: z.string().min(6, { message: "A senha deve conter pelo menos 6 caracteres!" })
        })

        const { name, email, password } = bodySchema.parse(req.body);

        const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

        if (userWithSameEmail){
            throw new AppError('E-mail já cadastrado!');
        }

        const hashedPassword = await hash(password, 8);

        const user = await prisma.user.create({ 
            data: {
                name,
                email,
                password: hashedPassword
            }
        })

        const { password: _,  ...userWithoutPassword} = user

        return res.status(201).json(userWithoutPassword);
    };
}

export { UsersController };