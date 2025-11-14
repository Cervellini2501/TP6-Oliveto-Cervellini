// backend/index.test.js

const request = require('supertest');

// ✅ MOCK de sqlite3 para no usar la base real ni los bindings nativos
jest.mock('sqlite3', () => {
  // simulamos métodos que usa tu código: new sqlite3.Database(), db.run(), db.all()
  const mockRun = jest.fn((sql, params, callback) => {
    // params puede ser opcional, ajustamos
    if (typeof params === 'function') {
      callback = params;
    }
    if (callback) callback(null);
  });

  const mockAll = jest.fn((sql, callback) => {
    if (callback) callback(null, []); // devolvemos lista vacía
  });

  function Database() {
    this.run = mockRun;
    this.all = mockAll;
  }

  return {
    verbose: () => ({
      Database
    })
  };
});

// 👉 Importamos la app DESPUÉS de mockear sqlite3
const app = require('./index');

// -----------------------------
// TEST 1: endpoint de salud
// -----------------------------
describe('API Palabras - endpoint /health', () => {
  test('GET /health debe responder 200 y status OK', async () => {
    const res = await request(app).get('/health');

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('environment');
  });
});

// --------------------------------------
// TEST 2 y 3: validaciones de POST /api/palabras
// --------------------------------------
describe('API Palabras - validación de POST /api/palabras', () => {
  test('debe responder 400 si falta el campo "palabra"', async () => {
    const payload = {}; // no mandamos "palabra"

    const res = await request(app)
      .post('/api/palabras')
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'La palabra es requerida' });
  });

  test('debe responder 400 si la palabra es una cadena vacía', async () => {
    const payload = { palabra: '' };

    const res = await request(app)
      .post('/api/palabras')
      .send(payload);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});

// --------------------------------------
// TEST 4: caso exitoso de POST /api/palabras
// --------------------------------------
describe('API Palabras - caso exitoso de POST /api/palabras', () => {
  test('debe responder 2xx y no incluir error cuando la palabra es válida', async () => {
    const payload = { palabra: 'hola' };

    const res = await request(app)
      .post('/api/palabras')
      .send(payload);

    // aceptamos 200 o 201 como válidos
    expect(res.statusCode).toBeGreaterThanOrEqual(200);
    expect(res.statusCode).toBeLessThan(300);

    // el body no debería tener un campo de error
    expect(res.body).not.toHaveProperty('error');
  });
});
