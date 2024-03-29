import request from "supertest"
import { app } from "../../app"

it("responds with details of the current user", async () => {
    const cookie = await global.signin();
    const response = await request(app)
        .get("/api/users/currentuser")
        .send()
        .expect(200);
       
    expect(response.body.email)
});



it("respond with null if not authenticated",async()=>{
    const response=await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

    expect(response.body.currentuser)
})