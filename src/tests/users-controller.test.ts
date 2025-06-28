import request from "supertest";
import { prisma } from "@/database/prisma";

import { app } from "@/app";


describe("UserController", () => {
    let user_id: string;

    afterAll(async () => {
        await prisma.user.delete({ where: { id: user_id } })
    })

    it("should create a new user successfully", async () => {
        const response = await request(app).post("/users").send({
            name: "Test User",
            email: "testuser@example.com",
            password: "password123"
        })

        user_id = response.body.id;

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.name).toBe("Test User");

    });

    it("sould throw an error if user with same email already exist", async () => {
            const response = await request(app).post("/users").send({
                name: "Duplicated User",
                email: "testuser@example.com",
                password: "password123"
            });

            expect(response.status).toBe(400); //o esperado é um erro 400 de duplicidade, 400 é o erro padrão que definimos ali no apperror.ts
            expect(response.body.message).toBe("E-mail já cadastrado!"); //mensagem que defini para quando um usuário com o mesmo email for cadastrado
    });

    it("should throw a validation error if the email is invalid", async () => {
        const response = await request(app).post("/users").send({
            name: "test user",
            email: "email-inválido",
            password: "password1234"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Erro de validação");
    })
})