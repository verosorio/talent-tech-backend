# talent-tech-backend

API REST para la gestión de **empresas, departamentos y empleados**, desarrollada con **NestJS**, **Prisma** y **PostgreSQL**, ejecutada **completamente con Docker**.

> Este proyecto está diseñado para ejecutarse con **Docker**.  
> No se recomienda correr Prisma ni la API directamente desde el host.

---

## Stack Tecnológico

- NestJS
- Prisma ORM
- PostgreSQL
- Docker & Docker Compose
- JWT Authentication
- CSV Upload

---

## Requisitos

- Docker ≥ 24
- Docker Compose v2
- Node.js (opcional, solo para desarrollo sin Docker)

---

## 🛠 Instalación (modo recomendado: Docker)

### Clonar el repositorio

```bash
git clone https://github.com/verosorio/talent-tech-backend.git
cd talent-tech-backend
```

### Configurar variables de entorno

```bash
cp .env.example .env
```

#### Variables por defecto:

```env
# ======================
# Base de Datos (Docker)
# ======================
DATABASE_URL="postgresql://postgres:postgres@talent-tech-db:5432/talent_tech"

POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=talent_tech

# ======================
# API
# ======================
PORT=3000

# ======================
# JWT
# ======================
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_EXPIRES_IN=15m

# ======================
# Entorno
# ======================
NODE_ENV=production
```

### Levantar los contenedores

```bash
docker compose up -d --build
```

### Ejecutar migraciones (OBLIGATORIO)

```bash
docker compose exec talent-tech-api npx prisma migrate deploy
```

### Ejecutar seeders (opcional)

```bash
docker compose exec talent-tech-api npx prisma db seed
```

---

## 🚀 Acceso a la API

- **Base URL:** `http://localhost:3000`
- **Swagger UI:** `http://localhost:3000/api`

---

## 🧪 Datos de Prueba (Seed)

Si ejecutaste el comando de seed, puedes usar las siguientes credenciales para probar la API (Login):

| Empresa            | Email              | Password    |
| ------------------ | ------------------ | ----------- |
| Acme Corp          | `admin@acme.com`   | `Admin123!` |
| Globex Corporation | `admin@globex.com` | `Admin123!` |

> **Nota:** El seed también genera departamentos (RH, IT, Marketing) y empleados de prueba para estas empresas.

---

## 🗄️ Estructura de la Base de Datos

### Tablas principales

| Tabla                         | Descripción                          |
| ----------------------------- | ------------------------------------ |
| `companies`                   | Empresas                             |
| `departments`                 | Departamentos                        |
| `employees`                   | Empleados                            |
| `employee_department_history` | Historial de cambios de departamento |

### Relaciones

- **Company** → **Departments** (1:N)
- **Company** → **Employees** (1:N)
- **Department** → **Employees** (1:N)
- **Employee** → **EmployeeDepartmentHistory** (1:N)

### Auditoría

- `createdAt`
- `updatedAt`
- `deletedAt` (eliminación lógica)

---

## 📡 Endpoints Principales

### Employees

| Método   | Ruta                | Descripción          |
| -------- | ------------------- | -------------------- |
| `POST`   | `/employees`        | Crear empleado       |
| `GET`    | `/employees`        | Listar empleados     |
| `GET`    | `/employees/:id`    | Obtener empleado     |
| `PATCH`  | `/employees/:id`    | Actualizar empleado  |
| `DELETE` | `/employees/:id`    | Eliminación lógica   |
| `POST`   | `/employees/upload` | Carga masiva por CSV |

### Departments

| Método   | Ruta               | Descripción          |
| -------- | ------------------ | -------------------- |
| `POST`   | `/departments`     | Crear departamento   |
| `GET`    | `/departments`     | Listar departamentos |
| `GET`    | `/departments/:id` | Obtener departamento |
| `PATCH`  | `/departments/:id` | Actualizar           |
| `DELETE` | `/departments/:id` | Eliminación lógica   |

---

## 🔐 Seguridad

- Autenticación mediante **JWT**.
- Autorización por **empresa**.
- Validación de DTOs.
- Protección contra inyección SQL mediante **Prisma**.
- Contraseñas hasheadas con **bcrypt**.
