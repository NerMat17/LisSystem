import { z } from 'zod'

export const loginSchema = z.object({
  employeeNumber: z.string().trim().min(1).regex(/^\d+$/),
  password: z.string().min(1),
})

export type LoginDto = z.infer<typeof loginSchema>