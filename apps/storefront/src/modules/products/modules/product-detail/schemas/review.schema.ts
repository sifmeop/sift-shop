import z from 'zod'

export const upsertReviewSchema = z.object({
  rating: z
    .number({ error: 'Rating must be a number' })
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5'),
  comment: z.string().max(1000)
})

export type UpsertReviewSchema = z.infer<typeof upsertReviewSchema>
