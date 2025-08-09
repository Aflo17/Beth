import { z } from 'zod';

export const videoUploadSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  description: z.string().max(1000, 'Description too long').optional(),
  pricing_tier_required: z.string().default('basic'),
  is_published: z.boolean().default(false),
});

export const videoUpdateSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long').optional(),
  description: z.string().max(1000, 'Description too long').optional(),
  pricing_tier_required: z.string().optional(),
  is_published: z.boolean().optional(),
});

export type VideoUploadData = z.infer<typeof videoUploadSchema>;
export type VideoUpdateData = z.infer<typeof videoUpdateSchema>;