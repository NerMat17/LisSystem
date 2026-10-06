import { z } from 'zod'

export const loginSchema = z.object({
  employeeNumber: z
    .string()
    .trim()
    .min(1, 'Ingresa tu número de empleado')
    .regex(/^\d+$/, 'El número de empleado solo debe contener números'),
  password: z.string().min(1, 'Ingresa tu contraseña'),
})