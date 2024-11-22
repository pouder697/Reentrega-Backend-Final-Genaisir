import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import viewsRouter from './routes/viewsRoutes.js';

const PORT = 8080;
const MONGO_URI = 'mongodb+srv://dbAndy:bz355097pe@cluster0.4ktax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Inicialización de Express
const app = express();

// Configuración de paths para compatibilidad con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.json()); // Parsear JSON
app.use(express.urlencoded({ extended: true })); // Parsear datos de formularios
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Conexión a DB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Conexión exitosa a MongoDB'))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Listening in http://localhost:${PORT}`);
});
