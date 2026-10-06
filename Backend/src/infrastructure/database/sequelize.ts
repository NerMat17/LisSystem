import { Sequelize  } from 'sequelize';
import { env } from '../../config/env';

export const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PASSWORD, {

    host: env.DB_SERVER,
    port: env.DB_PORT,
    dialect: 'mssql',
    logging: false,
    dialectOptions: {
        options: {
            encrypt: env.DB_ENCRYPT,
            trustServerCertificate: env.DB_TRUST_CERT,
        },
    },
    
});