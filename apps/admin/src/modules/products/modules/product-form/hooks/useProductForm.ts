import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from '../contexts/form-context'
import { productSchema } from '../schemas/product.schema'
import { ProductBasicInfo } from '../ui/steps/ProductBasicInfo'

const { useAppForm } = createFormHook({
	fieldContext,
	formContext,
	fieldComponents: {},
	formComponents: {
		ProductBasicInfo
	}
})

export const useProductForm = () => {
	const form = useAppForm({
		defaultValues: {
			category: '',
			description: ''
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
