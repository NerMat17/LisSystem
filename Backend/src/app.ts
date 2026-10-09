import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { notFoundHandler, errorHandler } from './shared/middlewares/error.middleware';
import { linesRoutes } from './modules/lines/lines.routes';
import { usersRoutes } from './modules/users/users.routes';
import { authRoutes } from './modules/auth/auth.routes';
import { env } from './config/env'

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,                // 10 intentos por IP en ese tiempo
  message: { message: 'Demasiados intentos. Intenta de nuevo en unos minutos.' },
})

const app = express();

app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGINS,
}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', loginLimiter, authRoutes);
app.use('/api/lines', linesRoutes);   // ← cada catálogo nuevo agrega una línea aquí
app.use('/api/users', usersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;