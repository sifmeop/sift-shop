import slugify from '@sindresorhus/slugify'
import { useForm, useStore } from '@tanstack/react-form'
import type { CoreRow } from '@tanstack/react-table'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { createCategorySchema } from '../schemas/createCategory.schema'
import type { Category } from '../types/category.types'
import { useCreateCategoryMutation } from './useCreateCategoryMutation'
import { useUpdateCategoryMutation } from './useUpdateCategoryMutation'

interface UseCategoryFormOptions {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Category>['original']
	onClose: () => void
}

export const useCategoryForm = ({
	mode,
	defaultValues,
	onClose
}: UseCategoryFormOptions) => {
	const createMutation = useCreateCategoryMutation()
	const updateMutation = useUpdateCategoryMutation(defaultValues?.id ?? '')

	const mutation = mode === 'edit' ? updateMutation : createMutation
	const isPending = mutation.isPending

	const form = useForm({
		defaultValues: {
			name: defaultValues?.name ?? '',
			slug: defaultValues?.slug ?? ''
		},
		validators: {
			onSubmit: createCategorySchema
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
						? 'Category updated successfully'
						: 'Category created successfully'
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
