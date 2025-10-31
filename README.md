# README — TP4 / Despliegue en Azure

Resumen
-------
Este repositorio contiene la aplicación del TP5 y las configuraciones de despliegue a Azure App Service. Aquí encontrarás cómo acceder a las aplicaciones (QA / PROD) y el proceso estándar de despliegue mediante Azure DevOps.

Acceso a los servicios
----------------------
- Entorno QA:
  - URL pública (reemplazar): <<palabras-qa-gebud8fdgxejeyen.brazilsouth-01.azurewebsites.net>>  
  - Nota: esta URL corresponde a la Web App `palabras-qa` creada en Azure.
- Entorno PROD:
  - URL pública (reemplazar): <<palabras-prod-amgufubhacevetcn.brazilsouth-01.azurewebsites.net>>  
  - Nota: esta URL corresponde a la Web App `palabras-prod` creada en Azure.

Credenciales y permisos
-----------------------
- Acceso a Azure Portal: usar la cuenta corporativa correspondiente.
- Azure DevOps:
  - Proyecto: <<TP4>>
  - Service Connection: <<azure-palabras-connection>>
- No guardar secretos en el repositorio. Usar Azure Key Vault o las Variables/Secretos del pipeline.

Pasos concretos para ejecutar el pipeline (resumen)
---------------------------------------------------
- En Azure DevOps → Pipelines → Nombre del pipeline: <<TP5>>
  1. Seleccionar "Run pipeline".
  2. Confirmar variables (si es necesario).
  3. Ejecutar y seguir los stages.
  4. Para PROD: aprobar cuando el pipeline solicite la aprobación en el Environment `PROD`.

