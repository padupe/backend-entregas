import { app } from "../../../../shared/infra/http/app";
import request from "supertest";
import { adminApp } from "../../../../database/seed";

describe("Create a Profile Controller", () => {

    it("Should be able to create a new Profile", async () => {

        const authAdmin = await request(app).post("/authenticate/admin").send({
            username: adminApp.username,
            password: adminApp.password
        })

        const { token } = authAdmin.body;

        const response = await request(app).post("/profiles").send({
            name: "Integration Profile Test",
            type: 33
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('profile');
    });

    it("Should not be able to create a new Profile with type already exists", async () => {
        
        const authAdmin = await request(app).post("/authenticate/admin").send({
            username: adminApp.username,
            password: adminApp.password
        })

        const { token } = authAdmin.body;

        const response = await request(app).post("/profiles").send({
            name: "Failure Test",
            type: 33
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    it("Should not be able to create a new Profile with name already exists", async () => {
        
        const authAdmin = await request(app).post("/authenticate/admin").send({
            username: adminApp.username,
            password: adminApp.password
        })

        const { token } = authAdmin.body;

        const response = await request(app).post("/profiles").send({
            name: "Integration Profile Test",
            type: 77
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    it("Should not be able to create a new Profile with invalid password", async () => {

        const authAdmin = await request(app).post("/authenticate/admin").send({
            username: adminApp.username,
            password: "failure"
        })

        const { token } = authAdmin.body;

        const response = await request(app).post("/profiles").send({
            name: "Failure login",
            type: 88
        }).set({
            Authorization: `Bearer ${token}`
        })

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message');
    });
})