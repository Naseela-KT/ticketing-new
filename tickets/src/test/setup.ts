import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

// declare global {
//     function signin(): Promise<string[]>;
// }
declare global {
    var signin: () => string[];
  }
let mongoServer:any;

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

global.signin = () => {
    //build a JWT payload. {id,email}
    const payload={
        id:"1234qwerty",
        email:"test@test.com"
    }
    //create the JWT!
    const token=jwt.sign(payload,process.env.JWT_KEY!);
    //build session object. {jwt: MY_JWT}
    const session={jwt:token}
    //Turn that session into JSON
    const sessionJSON=JSON.stringify(session);
    //Take JSON and encode it as base64
    const base64=Buffer.from(sessionJSON).toString('base64')
    //return a string : cookie with the encoded data

    return [`session=${base64}`];
};
