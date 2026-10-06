import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFoundHandler, errorHandler } from './shared/middlewares/error.middleware';
import { linesRoutes } from './modules/lines/lines.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/lines', linesRoutes);   // ← cada catálogo nuevo agrega una línea aquí

app.use(notFoundHandler);
app.use(errorHandler);

export default app;