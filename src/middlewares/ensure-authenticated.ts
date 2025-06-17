import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
    role: string,
    sub: string
};

function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            throw new AppError("JWT não encontrado!", 401);
        }

        // bearer hashToken (splitamos para pegar o token)
        const [, token] = authHeader.split(" ");

        /* desestruturamos a role e o id do usuário do token
        o método do jsonwebtoken, o verify, vai receber como parâmetro primeiro o token e depois a chave do JsonWebTokenError, e usamos a tipagem para ele reconhecer o que vai ter dentro do token, que vai ser a role e o id do usuário que definimos na interface */
        const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload;

        // agora vamos adicionar o usuário + suas infos dentro da requisição
        req.user = {
            id: user_id,
            role
        }

        return next();
    } catch (error) {
        throw new AppError("JWT inválido!", 401);
    }
}