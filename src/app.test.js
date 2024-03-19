const request = require('supertest');
const app = require('./app');

describe('GET /', () => {
  it('should return status code 200 and flag that the server is alive', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({isAlive: true});
  });
});