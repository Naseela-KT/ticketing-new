import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";

declare global {
    function signin(): Promise<string[]>;
}

let mongoServer: any;

beforeAll(async () => {
    process.env.JWT_KEY = "asdfghjkl";
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongoServer) {
        await mongoServer.stop();
    }
});

global.signin = async () => {
    const email = "test@test.com";
    const password = "password";

    const response = await request(app)
        .post("/api/users/signup")
        .send({ email, password })
        .expect(201);

    // const cookie = response.get("Set-Cookie");
    // console.log("Signup Response Headers:", response.body);

    return response.body;
};
