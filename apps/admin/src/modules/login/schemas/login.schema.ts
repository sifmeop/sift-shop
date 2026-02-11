import { z } from 'zod'

export const loginSchema = z.object({
	email: z.email('Please enter a valid email address'),
	password: z
		.string('Password is required')
		.min(8, 'Password must be at least 8 characters')
		.max(32, 'Password must be at most 32 characters')
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			'Password must contain at least one lowercase letter, one uppercase letter, and one number'
		)
})

export type LoginSchema = z.infer<typeof loginSchema>
