import { Pool } from 'pg';

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'practica_3',
    password: process.env.DB_PASSWORD || 'postgres',
    port: parseInt(process.env.DB_PORT || '5432'),
});

export const initializeDatabase = async () => {
    try {
        await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(50),
        correo VARCHAR(100),
        contraseña VARCHAR(100)
      );
    `);
        console.log('✅ Tabla usuarios creada correctamente');

        const result = await pool.query('SELECT * FROM usuarios');
        console.log('✅ Conexión a la base de datos exitosa');
        console.log('Usuarios actuales:', result.rows);
        return pool;
    } catch (error) {
        console.error('❌ Error al conectar a la base de datos:', error);
        throw error;
    }
};

export default pool;