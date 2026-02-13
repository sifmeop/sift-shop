import slugify from '@sindresorhus/slugify'
import { useForm, useStore } from '@tanstack/react-form'
import type { CoreRow } from '@tanstack/react-table'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { Route } from '~/app/routes/_auth/categories/$slug'
import { handleApiError } from '~/common/api/errorHandler'
import { validateImageFile } from '~/common/utils/validateImageFile'
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
	const { slug } = Route.useParams()
	const isEditMode = mode === 'edit'

	const createMutation = useCreateSubcategoryMutation()
	const updateMutation = useUpdateSubcategoryMutation(defaultValues?.id ?? '')
	const mutation = isEditMode ? updateMutation : createMutation

	const [file, setFile] = useState<File | null>(null)
	const [fileError, setFileError] = useState<string | null>(null)

	const resetFileState = useCallback(() => {
		setFile(null)
		setFileError(null)
	}, [])

	const handleValidateFile = useCallback(
		(fileToValidate: File | null): boolean => {
			const result = validateImageFile(fileToValidate)

			setFileError(result.error)

			if (!result.isValid && fileToValidate) {
				setFile(null)
			}

			return result.isValid
		},
		[]
	)

	const formDefaultValues = useMemo(
		() => ({
			name: defaultValues?.name ?? '',
			slug: defaultValues?.slug ?? ''
		}),
		[defaultValues?.name, defaultValues?.slug]
	)

	const form = useForm({
		defaultValues: formDefaultValues,
		validators: {
			onSubmit: createSubcategorySchema
		},
		onSubmit: async ({ value }) => {
			if (mutation.isPending) return

			if (isEditMode && value.name === defaultValues?.name) {
				onClose()
				resetFileState()
				return
			}

			if (!(isEditMode && !file) && !handleValidateFile(file)) {
				return
			}

			try {
				const formData = new FormData()
				formData.append('name', value.name)
				formData.append('slug', value.slug)
				formData.append('category', slug)

				if (file) {
					formData.append('image', file)
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
		}
	})

	const nameValue = useStore(form.store, (state) => state.values.name)

	useEffect(() => {
		form.setFieldValue('slug', slugify(nameValue))
	}, [nameValue, form])

	const onSubmit = useCallback(
		(e: React.ChangeEvent<HTMLFormElement>) => {
			e.preventDefault()
			e.stopPropagation()
			form.handleSubmit()
		},
		[form]
	)

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
