# Práctica 3 - Desarrollo Web

API REST de gestión de usuarios con Node.js, Express y PostgreSQL.

## Requisitos previos

- Node.js 16+ o superior
- PostgreSQL 12+ o superior
- pnpm (recomendado) o npm

## Instalación

### 1. Clonar o descargar el proyecto

```bash
cd practica-3-desarollo-web
```

### 2. Instalar dependencias

```bash
pnpm install
```

O si usas npm:
```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_USER=postgres
DB_HOST=localhost
DB_NAME=practica_3
DB_PASSWORD=postgres
DB_PORT=5432
PORT=3000
```

Ajusta los valores según tu configuración de PostgreSQL.

### 4. Crear la base de datos (opcional)

Si la base de datos no existe, créala en PostgreSQL:

```sql
CREATE DATABASE practica_3;
```

## Ejecutar el proyecto

### Modo desarrollo (con auto-reload)

```bash
pnpm dev
```

### Modo producción

```bash
pnpm start
```

El servidor estará disponible en `http://localhost:3000`

## Endpoints disponibles

### Usuarios

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/all` | Obtener todos los usuarios |
| GET | `/find/:id` | Obtener un usuario por ID |
| POST | `/create` | Crear un nuevo usuario |
| PUT | `/update/:id` | Actualizar un usuario |
| DELETE | `/delete/:id` | Eliminar un usuario |

## Estructura del proyecto

```
src/
├── db.js              # Configuración de conexión a PostgreSQL
├── index.js           # Punto de entrada de la aplicación
└── routes/
    ├── authRoutes.js  # Rutas de autenticación
    └── userRoutes.js  # Rutas de usuarios
```

## Notas

- Las contraseñas se encriptan con **bcrypt**
- Se valida que el correo no se repita en el registro
- CORS configurado para desarrollo local (Vite)

