import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import type { CoreRow } from '@tanstack/react-table'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import {
	categorySchema,
	type CategorySchema
} from '../schemas/createCategory.schema'
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

	const form = useForm<CategorySchema>({
		defaultValues: {
			name: defaultValues?.name ?? ''
		},
		resolver: zodResolver(categorySchema)
	})

	const onSubmit = form.handleSubmit(async (values) => {
		if (isPending) return

		if (mode === 'edit') {
			const nameIsChanged = values.name !== defaultValues?.name

			if (!nameIsChanged) {
				onClose()
				return
			}
		}

		const body = {
			name: values.name,
			slug: slugify(values.name, {
				decamelize: false
			})
		}

		try {
			if (mode === 'edit') {
				await updateMutation.mutateAsync(body)
			} else {
				await createMutation.mutateAsync(body)
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
	})

	return { onSubmit, form, isLoading: isPending }
}
