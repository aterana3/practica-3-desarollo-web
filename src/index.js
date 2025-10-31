import express from 'express';
import cors from 'cors';
import { initializeDatabase } from './db.js';
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', "http://localhost:5174", "http://127.0.0.1:5174"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());

// ROUTES
app.use(userRoutes);

const startServer = async () => {
  try {
    await initializeDatabase();
    app.listen(PORT, () => {
        console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
};

startServer();

