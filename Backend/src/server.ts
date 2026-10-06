import { createServer } from 'http';
import { env } from './config/env';
import app from './app';
import { sequelize } from './infrastructure/database/sequelize';

async function bootstrap() {
  await sequelize.authenticate();  // prueba la conexión; si falla, lanza error
  console.log('Conectado a SQL Server');

  const httpServer = createServer(app);
  httpServer.listen(env.PORT, () => {
    console.log(`LisSystem API corriendo en http://localhost:${env.PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('No se pudo iniciar el servidor:', err);
  process.exit(1);
});