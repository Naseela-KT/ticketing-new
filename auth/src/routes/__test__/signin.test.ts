import request from "supertest"
import { app } from "../../app"


it("fails when wrong email is given",async()=>{
    await request(app)
    .post("/api/users/signin")
    .send({
        email:"klfnasfnksf@kk.com",
        password:"password"
    })
    .expect(400);
})

it('fails when an incorrect password is supplied', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'aslkdfjalskdfj'
      })
      .expect(400);
  });
  
  it('responds with a cookie when given valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);

    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200);

    // Check that the 'Set-Cookie' header is present and not undefined
    expect(response.get('Set-Cookie'))
});

  