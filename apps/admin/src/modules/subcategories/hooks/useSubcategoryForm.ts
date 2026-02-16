import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import type { CoreRow } from '@tanstack/react-table'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Route } from '~/app/routes/_auth/categories/$slug'
import { handleApiError } from '~/common/api/errorHandler'
import { validateImageFile } from '~/common/utils/validateImageFile'
import {
	subcategorySchema,
	type SubcategorySchema
} from '../schemas/subcategory.schema'
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
	const { slug } = Route.useParams()
	const isEditMode = mode === 'edit'

	const createMutation = useCreateSubcategoryMutation()
	const updateMutation = useUpdateSubcategoryMutation(defaultValues?.id ?? '')
	const mutation = isEditMode ? updateMutation : createMutation

	const [file, setFile] = useState<File | null>(null)
	const [fileError, setFileError] = useState<string | null>(null)

	const resetFileState = () => {
		setFile(null)
		setFileError(null)
	}

	const handleValidateFile = (fileToValidate: File | null): boolean => {
		const result = validateImageFile(fileToValidate)

		setFileError(result.error)

		if (!result.isValid && fileToValidate) {
			setFile(null)
		}

		return result.isValid
	}

	const form = useForm<SubcategorySchema>({
		defaultValues: {
			name: defaultValues?.name ?? ''
		},
		resolver: zodResolver(subcategorySchema)
	})

	const onSubmit = form.handleSubmit(async (values) => {
		if (mutation.isPending) return

		if (isEditMode && values.name === defaultValues?.name) {
			onClose()
			resetFileState()
			return
		}

		if (!(isEditMode && !file) && !handleValidateFile(file)) {
			return
		}

		const body = {
			name: values.name,
			slug: slugify(values.name, {
				decamelize: false
			})
		}

		try {
			const formData = new FormData()
			formData.append('name', body.name)
			formData.append('slug', body.slug)
			formData.append('category', slug)

			if (file) {
				formData.append('files', file)
			}

			await mutation.mutateAsync(formData)

			form.reset()
			onClose()
			resetFileState()

			toast.success(
				`Subcategory ${isEditMode ? 'updated' : 'created'} successfully`
			)
		} catch (err) {
			toast.error(handleApiError(err))
		}
	})

	return {
		onSubmit,
		form,
		isLoading: mutation.isPending,
		file,
		setFile,
		fileError,
		setFileError
	}
}
