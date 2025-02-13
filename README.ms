# 🛍️ Products App - Full Stack (Angular + Node.js)

Este es un proyecto full stack que incluye:

- 🌐 **Frontend:** Angular con Material UI
- 🖥️ **Backend:** Node.js + Express con base de datos (MongoDB o SQL)

---

## 🚀 Instalación Rápida Backend
### **📌 Tecnologías Principales**
| Tecnología         | Descripción                                    | Versión 📌  |
|-------------------|--------------------------------|-----------|
| **Node.js**       | Plataforma de desarrollo en JavaScript | `^22.13.1`  |
| **Express.js**    | Framework para servidores HTTP  | `^4.21.2`  |
| **TypeScript**    | Superset de JavaScript con tipado | `^5.7.3`  |
| **TypeORM**       | ORM para bases de datos SQL | `^0.3.20`  |
| **MSSQL**         | Conector para Microsoft SQL Server | `^10.0.4`  |

### **1️⃣ Clonar el Repositorio**
```sh
git clone https://github.com/TU_USUARIO/products-app.git
cd products-app

### **2️⃣ Instalar Dependencias Backend**
cd backend-app && npm install

3️⃣ Configurar Variables de Entorno**
Crea el archivo de configuración para el backend:
cp backend-app/.env.example backend-app/.env

📌 Abre el archivo .env y edita las siguientes variables según tu configuración:
# Configuración de la Base de Datos SQL Server
DB_HOST=localhost        # Dirección del servidor SQL
DB_PORT=1433            # Puerto de SQL Server (Por defecto 1433)
DB_USER=sa              # Usuario de la base de datos
DB_PASSWORD=TuPassword  # Cambia esto por la contraseña real
DB_NAME=backend_db      # Nombre de la base de datos
DB_INSTANCE=SQLEXPRESS  # Instancia de SQL Server

# Seguridad
JWT_SECRET=tu_clave_secreta  # Clave secreta para autenticación JWT


▶️ Verificar que .env se Carga Correctamente
Después de configurar .env, ejecuta el backend con:
En desarrollo
cd backend-app
npm run dev
Si todo está bien, deberías ver un mensaje similar en la terminal:
Conectando a la base de datos en localhost:1433...
Servidor corriendo en http://localhost:3000/

📌 ¿Qué hacer si la Conexión Falla?
Si tienes problemas con la conexión a la base de datos: 1️⃣ Verifica que SQL Server está corriendo en el puerto correcto (DB_PORT).
2️⃣ Asegúrate de que el usuario (DB_USER) y contraseña (DB_PASSWORD) son correctos.
3️⃣ Si usas Docker, revisa la configuración de red para permitir conexiones externas.



## 🚀 Instalación Rápida FrontEnd

# AngularProducts
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.12.

### ** Instalar Dependencias FrontEnd**
cd ../angular-products && npm install

Ejecutar el Frontend
cd angular-products
ng serve --open

✅ Si todo está bien, Angular abrirá la aplicación en http://localhost:4200/.
❌ Si aparece un error, revisa que node_modules/ exista o reinstala con:
rd /s /q node_modules package-lock.json
npm install