import { Router } from 'express';
import bcrypt from 'bcrypt';
import pool from '../db.js';

const router = Router();

router.get('/all', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM usuarios');

        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/create', async (req, res) => {
    try {
        const { nombre, correo, contraseña } = req.body;

        if (!nombre || !correo || !contraseña) {
            return res.status(400).json({ message: 'Debe proporcionar nombre, correo y contraseña' });
        }

        const existingUser = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);

        if (existingUser.rows.length > 0) {
            return res.status(409).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const result = await pool.query(
            'INSERT INTO usuarios (nombre, correo, contraseña) VALUES ($1, $2, $3) RETURNING *',
            [nombre, correo, hashedPassword]
        );

        res.status(201).json({ message: 'Usuario creado correctamente', usuario: result.rows[0] });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/find/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching user by id:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, correo, contraseña } = req.body;

        if (!nombre && !correo && !contraseña) {
            return res.status(400).json({ message: 'Debe proporcionar al menos un campo para actualizar' });
        }

        const updates = [];
        const values = [];
        let paramCount = 1;

        if (nombre) {
            updates.push(`nombre = $${paramCount++}`);
            values.push(nombre);
        }
        if (correo) {
            updates.push(`correo = $${paramCount++}`);
            values.push(correo);
        }
        if (contraseña) {
            updates.push(`contraseña = $${paramCount++}`);
            values.push(contraseña);
        }

        values.push(id);

        const query = `UPDATE usuarios SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario actualizado correctamente', usuario: result.rows[0] });
    } catch (error) {
        console.error('Error updating user by id:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.json({ message: 'Usuario eliminado correctamente', usuario: result.rows[0] });
    } catch (error) {
        console.error('Error deleting user by id:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;

