import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { ZodError } from "zod";

export function errorHandling(error: any, req: Request, res: Response, next: NextFunction){
    //verifica se o erro é uma instância da nossa classe, aí vai ser um erro interno
    if(error instanceof AppError){
        return res.status(error.statusCode).json({ message: error.message });
    };

    //verifica se é um erro da instância do zod, aí vai ser um erro de validação
    if(error instanceof ZodError){
        return res.status(400).json({
            message: "Erro de validação",
            issues: error.format(),
        });
    };

    //retorna um erro genérico se nao cair em nenhuma das cond
    return res.status(500).json({ message: error.message });
}