import slugify from '@sindresorhus/slugify'
import { useForm, useStore } from '@tanstack/react-form'
import type { CoreRow } from '@tanstack/react-table'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { createSubcategorySchema } from '../schemas/createSubcategory.schema'
import type { Subcategory } from '../types/subcategory.types'
import { useCreateSubcategoryMutation } from './useCreateSubcategoryMutation'
import { useUpdateSubcategoryMutation } from './useUpdateSubcategoryMutation'

interface UseSubcategoryFormOptions {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Subcategory>['original']
	onClose: () => void
}

export const useSubcategoryForm = ({
	mode,
	defaultValues,
	onClose
}: UseSubcategoryFormOptions) => {
	const createMutation = useCreateSubcategoryMutation()
	const updateMutation = useUpdateSubcategoryMutation(defaultValues?.id ?? '')

	const mutation = mode === 'edit' ? updateMutation : createMutation
	const isPending = mutation.isPending

	const form = useForm({
		defaultValues: {
			name: defaultValues?.name ?? '',
			slug: defaultValues?.slug ?? '',
			image: defaultValues?.image ?? '',
			categoryId: defaultValues?.categoryId ?? ''
		},
		validators: {
			onSubmit: createSubcategorySchema
		},
		onSubmit: async ({ value }) => {
			if (isPending) return

			if (mode === 'edit') {
				const nameIsChanged = value.name !== defaultValues?.name

				if (!nameIsChanged) {
					onClose()
					return
				}
			}

			try {
				if (mode === 'edit') {
					await updateMutation.mutateAsync(value)
				} else {
					await createMutation.mutateAsync(value)
				}

				form.reset()
				onClose()
				toast.success(
					mode === 'edit'
						? 'Subcategory updated successfully'
						: 'Subcategory created successfully'
				)
			} catch (err) {
				const message = handleApiError(err)
				toast.error(message)
			}
		}
	})

	const nameValue = useStore(form.store, (state) => state.values.name)

	useEffect(() => {
		form.setFieldValue('slug', slugify(nameValue))
	}, [nameValue, mode])

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return { onSubmit, form, isLoading: isPending }
}
