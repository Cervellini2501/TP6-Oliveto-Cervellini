const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Puerto dinámico de Azure
const PORT = process.env.PORT || 3000;

// Leer variables de entorno configuradas en Azure
const ENV_NAME = process.env.ENVIRONMENT_NAME || 'development';
const NODE_ENV = process.env.NODE_ENV || 'development';
const DB_PATH = process.env.DB_PATH || './palabras.db';

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'frontend')));

// Inicializar base de datos con path configurable
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error al conectar con la base de datos:', err);
  } else {
    console.log(`✅ Conectado a la base de datos: ${DB_PATH}`);
    db.run(`CREATE TABLE IF NOT EXISTS palabras (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      palabra TEXT NOT NULL,
      fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// API Routes para CRUD de palabras
app.get('/api/palabras', (req, res) => {
  console.log('📥 GET /api/palabras');
  db.all('SELECT * FROM palabras ORDER BY fecha_creacion DESC', (err, rows) => {
    if (err) {
      console.error('❌ Error:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log(`✅ Devolviendo ${rows.length} palabras`);
      res.json(rows);
    }
  });
});

app.post('/api/palabras', (req, res) => {
  const { palabra } = req.body;
  console.log('📥 POST /api/palabras ->', palabra);
  
  if (!palabra) {
    return res.status(400).json({ error: 'La palabra es requerida' });
  }
  
  db.run('INSERT INTO palabras (palabra) VALUES (?)', [palabra], function(err) {
    if (err) {
      console.error('❌ Error:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log(`✅ Palabra agregada - ID: ${this.lastID}`);
      res.json({ 
        id: this.lastID, 
        palabra: palabra,
        mensaje: 'Palabra agregada exitosamente' 
      });
    }
  });
});

app.delete('/api/palabras/:id', (req, res) => {
  const { id } = req.params;
  console.log('📥 DELETE /api/palabras/' + id);
  
  db.run('DELETE FROM palabras WHERE id = ?', id, function(err) {
    if (err) {
      console.error('❌ Error:', err.message);
      res.status(500).json({ error: err.message });
    } else {
      console.log(`✅ Palabra eliminada - ID: ${id}`);
      res.json({ mensaje: 'Palabra eliminada exitosamente' });
    }
  });
});

// Endpoint para Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK',
    message: 'API Palabras funcionando correctamente',
    environment: ENV_NAME,
    nodeEnv: NODE_ENV,
    port: PORT,
    timestamp: new Date().toISOString()
  });
});

// Catch-all - AL FINAL
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Listen en 0.0.0.0 para Azure
app.listen(PORT, '0.0.0.0', () => {
  console.log('════════════════════════════════════════');
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📍 Environment: ${ENV_NAME} (NODE_ENV: ${NODE_ENV})`);
  console.log(`💾 Database: ${DB_PATH}`);
  console.log(`📁 Serving frontend from: ${path.join(__dirname, 'frontend')}`);
  console.log(`🌐 Listening on 0.0.0.0:${PORT}`);
  console.log('════════════════════════════════════════');
});