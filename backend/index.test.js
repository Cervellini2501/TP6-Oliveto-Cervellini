// backend/index.test.js
const request = require('supertest');
const app = require('./index'); // importa el app de Express

describe('API Palabras - endpoint /health', () => {
  test('GET /health debe responder 200 y status OK', async () => {
    // Act
    const res = await request(app).get('/health');

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('environment');
  });
});

describe('API Palabras - validación de POST /api/palabras', () => {
  test('debe responder 400 si falta el campo "palabra"', async () => {
    // Arrange: enviamos un body vacío
    const payload = {}; 

    // Act
    const res = await request(app)
      .post('/api/palabras')
      .send(payload);

    // Assert
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'La palabra es requerida' });
  });
});
