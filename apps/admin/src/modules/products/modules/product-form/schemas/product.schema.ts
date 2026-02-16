import { z } from 'zod'

export const productSchema = z.object({
	// step #1
	category: z.object(
		{
			id: z.uuid(),
			name: z.string(),
			slug: z.string()
		},
		'Category is required'
	),
	subcategory: z.object(
		{
			id: z.uuid(),
			name: z.string(),
			slug: z.string()
		},
		'Subcategory is required'
	),

	// step #2
	filters: z
		.array(
			z.object({
				id: z.uuid(),
				name: z.string().min(1, 'Name is required'),
				value: z.string().min(1, 'Value is required'),
				valueLabel: z.string().min(1, 'Label is required')
			})
		)
		.min(1, 'At least one option is required'),

	// step #3
	specifications: z.array(
		z.object({
			name: z.string().min(1, 'Name is required'),
			value: z.string().min(1, 'Value is required')
		})
	),

	// step #4
	name: z.string().min(1, 'Name is required'),
	description: z.string().max(500),
	price: z.string().min(1, 'Price is required'),
	stock: z.string().min(1, 'Quantity is required'),

	// step #5
	images: z
		.array(z.union([z.url(), z.string().startsWith('data:image/')]))
		.min(1, 'At least one image is required')
		.max(10, 'Maximum 10 images allowed')
})

export const step1Schema = productSchema.pick({
	category: true,
	subcategory: true
})

export const step2Schema = productSchema.pick({
	filters: true
})

export const step3Schema = productSchema.pick({
	specifications: true
})

export const step4Schema = productSchema.pick({
	name: true,
	description: true,
	price: true,
	stock: true
})

export const step5Schema = productSchema.pick({
	images: true
})

export type ProductSchema = z.infer<typeof productSchema>
