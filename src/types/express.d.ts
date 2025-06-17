// alteramos a tipagem das requisições para adicionar o id e a role do usuário, pro ts nao reclamar
declare namespace Express {
    export interface Request {
        user?: {
            id: string,
            role: string
        }
    }
}