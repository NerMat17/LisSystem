import { z } from 'zod';


export const createLineSchema = z.object({
  code: z.string().trim().min(2).max(50)
    .regex(/^[a-z0-9-]+$/, 'Only lowercase letters, numbers and hyphens are allowed'),
  name: z.string().trim().min(2).max(100),
  hourlyTarget: z.number().int().positive(),
  machineTag: z.string().trim().min(1).max(50),
});


export const updateLineSchema = createLineSchema.partial().extend({
  isActive: z.boolean().optional(),
});


export type CreateLineDto = z.infer<typeof createLineSchema>;
export type UpdateLineDto = z.infer<typeof updateLineSchema>;