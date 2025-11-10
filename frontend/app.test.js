// frontend/app.test.js
// ✅ Test unitario del frontend (TP6 - Pruebas Unitarias)
// Usamos Jest con entorno jsdom para simular un navegador

const { esPalabraValida } = require('./app.js'); // importamos la función a probar

describe('Validación de palabras en el frontend', () => {

  test('debe rechazar palabras vacías o solo espacios', () => {
    // Arrange - entradas inválidas
    const vacias = ['', '   ', null, undefined];

    // Act & Assert - verificamos que todas devuelvan false
    vacias.forEach(p => {
      expect(esPalabraValida(p)).toBe(false);
    });
  });

  test('debe rechazar palabras de 1 solo carácter', () => {
    // Arrange
    const cortas = ['a', 'Z', ' x '];

    // Act & Assert
    cortas.forEach(p => {
      expect(esPalabraValida(p)).toBe(false);
    });
  });

  test('debe aceptar palabras válidas de 2 o más caracteres', () => {
    // Arrange
    const validas = ['hola', 'ok', 'palabra', ' prueba '];

    // Act & Assert
    validas.forEach(p => {
      expect(esPalabraValida(p)).toBe(true);
    });
  });

});
