import { useForm } from '@tanstack/react-form'
import { productSchema } from '../schemas/product.schema'

export const useProductForm = () => {
	const form = useForm({
		defaultValues: {
			category: ''
		},
		validators: {
			onSubmit: productSchema
		},
		onSubmit: ({ value }) => {
			console.debug('onSubmit', value)
		}
	})

	const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return { form, onSubmit, isLoading: false }
}
