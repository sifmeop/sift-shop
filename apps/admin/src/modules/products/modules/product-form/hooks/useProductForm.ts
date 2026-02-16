import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { productSchema, type ProductSchema } from '../schemas/product.schema'
import { useCreateProductMutation } from './useCreateProductMutation'

const dataURLtoFile = (dataurl: string, filename: string): File => {
	const arr = dataurl.split(',')
	if (arr.length < 2) throw new Error('Invalid data URL')

	const mimeMatch = arr[0].match(/:(.*?);/)
	if (!mimeMatch) throw new Error('Invalid mime type')

	const mime = mimeMatch[1]
	const bstr = atob(arr[1])
	let n = bstr.length
	const u8arr = new Uint8Array(n)

	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new File([u8arr], filename, { type: mime })
}

export const transformFormDataToDto = (formData: ProductSchema) => {
	return {
		slug: slugify(formData.name, { decamelize: false }),
		name: formData.name,
		description: formData.description || undefined,
		stock: Number(formData.stock),
		price: formData.price,

		specifications: formData.specifications.reduce(
			(acc, curr) => {
				if (curr.name && curr.value) acc[curr.name] = curr.value
				return acc
			},
			{} as Record<string, string>
		),

		filterValues: formData.filters.map((filter) => filter.id),
		subcategorySlug: formData.subcategory.slug
	}
}

export const useProductForm = (resetStep: () => void) => {
	const { mutateAsync, isPending } = useCreateProductMutation()

	const form = useForm<ProductSchema>({
		defaultValues: {
			// step #1
			category: undefined,
			subcategory: undefined,

			// step #2
			filters: [],

			// step #3
			specifications: [],

			// step #4
			name: '',
			description: '',
			price: '',
			stock: '',

			// step #5
			images: []
		},
		resolver: zodResolver(productSchema),
		mode: 'onChange'
	})

	const onSubmit = form.handleSubmit(async (data) => {
		try {
			const formData = new FormData()
			const dto = transformFormDataToDto(data)

			data.images.forEach((image, index) => {
				if (image.startsWith('data:image')) {
					const file = dataURLtoFile(image, `image-${index}.jpg`)
					formData.append('files', file)
				}
			})

			Object.entries(dto).forEach(([key, value]) => {
				if (value === undefined || value === null) return

				if (Array.isArray(value) || typeof value === 'object') {
					formData.append(key, JSON.stringify(value))
				} else {
					formData.append(key, String(value))
				}
			})

			console.debug('formData', formData)

			await mutateAsync(formData)

			resetStep()
			form.reset()

			toast.success(
				'Product created successfully! You can now add more products.'
			)
		} catch (err) {
			toast.error(handleApiError(err))
		}
	})

	return { form, onSubmit, isLoading: isPending }
}
