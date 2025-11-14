# TP6 – Pruebas Unitarias (Ingeniería de Software 3)

**Autores:** Sofía Oliveto – Valentina Cervellini  
**Año:** 2025

Este proyecto implementa pruebas unitarias para el **frontend** y **backend**, integradas con **Azure DevOps** y posteriormente migradas a **GitHub**.  
Incluye validaciones, mocks, pruebas de API y pipeline de CI.

---

## 📌 1. Tecnologías utilizadas

### **Frontend**
- JavaScript
- Jest (con entorno `jsdom`)
- Validación de cadenas (`esPalabraValida`)

### **Backend**
- Node.js / Express
- Jest
- Supertest (para requests HTTP simulados)
- Mock de `sqlite3` para evitar acceso a la base real

### **CI/CD**
- Azure DevOps Pipelines
- Ejecución automática de tests
- Integración continua con rama `main`

---

## 📌 2. Estructura del Proyecto

```bash
TP6-Oliveto-Cervellini/
│
├── backend/
│   ├── index.js
│   ├── index.test.js
│   └── palabras.db
│
├── frontend/
│   ├── app.js
│   ├── app.test.js
│   ├── index.js
│   └── index.html
│
├── images/
│   └── (capturas utilizadas en documentación)
│
├── decisiones.md
└── README.md
