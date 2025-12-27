# talent-tech-backend API
API REST para la gestión de empleados y departamentos de empresas, desarrollada con NestJS, Prisma y Postgres/MySQL.




## 🛠 Instalación

1. Clonar el repositorio:

git clone https://github.com/verosorio/talent-tech-backend.git
cd talent-tech-backend


2. Instalar dependencias

npm install


3. Configurar variables de entorno:

Copia .env.example a .env y completa los valores según tu entorno local.

cp .env.example .env


4. Generar el cliente de prisma

npx prisma generate


5. (Opcional) Levantar con Docker

docker compose up -d


6. Crear la base de datos y ejecutar migraciones:

npx prisma migrate dev


7. (Opcional) Cargar datos de prueba usando seeders:

npm run prisma:seed


## 🚀 Ejecución
🔧 Modo Desarrollo

Terminal 1: Levantar solo la base de datos

docker compose up talent-tech-db -d


Terminal 2: Ejecutar la app en modo desarrollo

npm run start:dev


🖥️ Modo Producción

1. Detener contenedores actuales
docker compose down

2. Reconstruir con el nuevo .env.production
docker compose up --build -d

3. Ver logs
docker compose logs -f talent-tech-api

4. Ejecutar migraciones
docker compose exec talent-tech-api npx prisma migrate deploy

5. Seeders (opcional)
docker compose exec talent-tech-api npx prisma db seed


Para levantar la app en modo producción (sin reconstruir):

docker-compose up -d



## 🚀 Comandos principales

- Levantar la aplicación en modo desarrollo:

npm run start:dev


- Construir proyecto para producción:

npm run build


- Ejecutar seeders

npm run prisma:seed



## 🗄 Estructura de la base de datos

1. Tablas principales:

Tabla	                         Descripción
companies	                     Empresas
departments	                     Departamentos de cada empresa
employees	                     Empleados
employee_department_history	     Historial de cambios de departamento


2. Relaciones:

Company → Departments (1:N)

Company → Employees (1:N)

Department → Employees (1:N)

Employee → EmployeeDepartmentHistory (1:N)



3. Timestamps y auditoría:

createdAt, updatedAt

deletedAt para eliminaciones lógicas



4. Indices importantes:

employees.email único por empresa

departments.name único por empresa

Índices para consultas por companyId, departmentId y hiredAt





## 📦 Endpoints principales

Employees:

Método	Ruta	Descripción
POST	/employees	Crear empleado
GET	/employees	Listar empleados
GET	/employees/:id	Obtener empleado por ID
PATCH	/employees/:id	Actualizar empleado
DELETE	/employees/:id	Eliminar empleado (lógico)
POST	/employees/upload	Subir CSV de empleados

Departments:

Método	Ruta	Descripción
POST	/departments	Crear departamento
GET	/departments	Listar departamentos
GET	/departments/:id	Obtener departamento por ID
PATCH	/departments/:id	Actualizar departamento
DELETE	/departments/:id	Eliminar departamento (lógico)



## 🔑 Seguridad

- JWT para autenticación
- Validación y sanitización de datos (incluyendo CSV)
- Autorización por empresa
- Protección contra inyecciones mediante Prisma y validaciones de DTO


## Ejemplos de consumo de API

1. Listar empleados

curl -X GET http://localhost:3000/employees \
-H "Authorization: Bearer <TOKEN>"


2. Crear un empleado

curl -X POST http://localhost:3000/employees \
-H "Authorization: Bearer <TOKEN>" \
-H "Content-Type: application/json" \
-d '{
  "firstName": "Juan",
  "lastName": "Pérez",
  "email": "juan.perez@example.com",
  "departmentName": "Ventas",
  "hiredAt": "2023-01-15",
  "isActive": true
}'
