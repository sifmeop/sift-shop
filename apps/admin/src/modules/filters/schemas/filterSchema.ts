import { z } from 'zod'
import { filterTypeKeys } from '../types/filters.types'

const filterOptionSchema = z.object({
	label: z
		.string()
		.min(1, 'Label is required')
		.max(100, 'Label must be less than 100 characters')
})

export const filterSchema = z.object({
	name: z
		.string()
		.min(1, 'Filter name is required')
		.max(100, 'Filter name must be less than 100 characters'),
	type: z.literal(filterTypeKeys, { error: 'Filter type is required' }),
	options: z
		.array(filterOptionSchema)
		.min(1, 'At least one option is required')
		.superRefine((options, ctx) => {
			const labels = options.map((o) => o.label)

			options.forEach((option, index) => {
				if (index > 0 && labels.indexOf(option.label) < index) {
					ctx.addIssue({
						code: 'custom',
						message: 'Option labels must be unique',
						path: [index, 'label']
					})
				}
			})
		})
})

export type FilterSchema = z.infer<typeof filterSchema>
