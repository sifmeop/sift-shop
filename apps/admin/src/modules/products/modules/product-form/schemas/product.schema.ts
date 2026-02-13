import { z } from 'zod'

export const productSchema = z.object({
	category: z.string().min(1, 'Category is required'),
	subcategory: z.string().min(1, 'Subcategory is required')
})

export type ProductSchema = z.infer<typeof productSchema>
