import slugify from '@sindresorhus/slugify'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { filterSchema } from '../schemas/filterSchema'
import { FilterType, type Filter } from '../types/filters.types'
import { useCreateFilterMutation } from './useCreateFilterMutation'
import { useUpdateFilterMutation } from './useUpdateFilterMutation'

interface UseFilterFormOptions {
	mode: 'create' | 'edit'
	defaultValues?: Filter
	onClose: () => void
}

export const useFilterForm = ({
	mode,
	defaultValues,
	onClose
}: UseFilterFormOptions) => {
	const isEditMode = mode === 'edit'

	const createMutation = useCreateFilterMutation()
	const updateMutation = useUpdateFilterMutation(defaultValues?.id ?? '')
	const mutation = isEditMode ? updateMutation : createMutation

	const isPending = mutation.isPending

	const form = useForm({
		defaultValues: {
			name: defaultValues?.name ?? '',
			type: defaultValues?.type ?? FilterType.CHECKBOX,
			options: defaultValues?.options
				? defaultValues?.options.map(({ label }) => ({ label }))
				: [{ label: '' }]
		},
		validators: {
			onSubmit: filterSchema
		},
		onSubmit: async ({ value }) => {
			if (isPending) return

			const body = {
				name: value.name,
				value: slugify(value.name),
				type: value.type,
				options: value.options.map(({ label }, index) => ({
					label,
					value: slugify(label),
					position: index + 1
				}))
			}

			if (isEditMode && defaultValues) {
				const isNameChanged = value.name !== defaultValues.name
				const isTypeChanged = value.type !== defaultValues.type
				const isOptionsChanged =
					value.options.length !== defaultValues.options.length ||
					value.options.some(
						(opt, i) => opt.label !== defaultValues.options[i]?.label
					)

				if (!isNameChanged && !isTypeChanged && !isOptionsChanged) {
					onClose()
					return
				}
			}

			try {
				if (isEditMode) {
					await updateMutation.mutateAsync(body)
				} else {
					await createMutation.mutateAsync(body)
				}

				form.reset()
				onClose()
				toast.success(
					mode === 'edit'
						? 'Filter updated successfully'
						: 'Filter created successfully'
				)
			} catch (err) {
				const message = handleApiError(err)
				toast.error(message)
			}
		}
	})

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		e.stopPropagation()
		form.handleSubmit()
	}

	return { onSubmit, form, isLoading: isPending }
}
