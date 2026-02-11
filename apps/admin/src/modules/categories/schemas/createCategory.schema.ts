import { z } from 'zod'

export const createCategorySchema = z.object({
	name: z
		.string('Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters')
		.regex(
			/^[A-Za-z\s\-&]+$/,
			'Name must contain only letters, spaces, hyphens and &'
		)
		.trim(),
	slug: z
		.string('Slug is required')
		.min(2, 'Slug must be at least 2 characters')
		.max(50, 'Slug must be at most 50 characters')
		.regex(
			/^[a-z]+(?:-[a-z]+)*$/,
			'Slug must contain only lowercase letters and hyphens'
		)
		.trim()
})

export type CreateCategorySchema = z.infer<typeof createCategorySchema>
