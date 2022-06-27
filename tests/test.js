import supertest from "supertest";
import app from "../src/app";

const api = supertest(app);

test('watched', async () => {
    await api
        .get('/watched/')
        .expect(400)
        .expect('Content-Type', /application\/json/)
});