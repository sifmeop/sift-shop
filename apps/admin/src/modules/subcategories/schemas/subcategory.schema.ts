import { z } from 'zod'

export const subcategorySchema = z.object({
	name: z
		.string('Name is required')
		.min(2, 'Name must be at least 2 characters')
		.max(50, 'Name must be at most 50 characters')
		.regex(
			/^[A-Za-z\s\-&]+$/,
			'Name must contain only letters, spaces, hyphens and &'
		)
		.trim()
})

export type SubcategorySchema = z.infer<typeof subcategorySchema>
