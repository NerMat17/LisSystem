import type { ErrorRequestHandler, RequestHandler } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../errors/AppError';

export const notFoundHandler: RequestHandler = (req, res) => {
    res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {

    if(err instanceof ZodError) {
        res.status(400).json({
            message: 'Invalid data',
            errors: err.issues.map((i) =>({ field: i.path.join('.'), message: i.message })),
        });
        return;
    }

    if(err instanceof AppError) {
        res.status(err.statusCode).json({ message: err.message });
        return;
    }

    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
}