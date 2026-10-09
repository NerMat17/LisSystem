import { z } from 'zod'

export const createUserSchema = z.object({
  employeeNumber: z.string().trim().min(1).max(20).regex(/^\d+$/, 'Solo números'),
  name: z.string().trim().min(2).max(100),
  roleId: z.number().int().positive(),
  password: z.string().min(8).max(72).optional(),
})

export const updateUserSchema = createUserSchema.partial().extend({
  isActive: z.boolean().optional(),
})

export type CreateUserDto = z.infer<typeof createUserSchema>
export type UpdateUserDto = z.infer<typeof updateUserSchema>