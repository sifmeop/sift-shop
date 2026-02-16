import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { filterSchema, type FilterSchema } from '../schemas/filterSchema'
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

	const form = useForm<FilterSchema>({
		defaultValues: {
			name: defaultValues?.name ?? '',
			type: defaultValues?.type ?? FilterType.CHECKBOX,
			options: defaultValues?.options
				? defaultValues?.options.map(({ label }) => ({ label }))
				: [{ label: '' }]
		},
		resolver: zodResolver(filterSchema)
	})

	const onSubmit = form.handleSubmit(async (values) => {
		if (isPending) return

		const body = {
			name: values.name,
			value: slugify(values.name, {
				decamelize: false
			}),
			type: values.type,
			options: values.options.map(({ label }, index) => ({
				label,
				value: slugify(label, {
					decamelize: false
				}),
				position: index + 1
			}))
		}

		if (isEditMode && defaultValues) {
			const isNameChanged = values.name !== defaultValues.name
			const isTypeChanged = values.type !== defaultValues.type
			const isOptionsChanged =
				values.options.length !== defaultValues.options.length ||
				values.options.some(
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
	})

	return { onSubmit, form, isLoading: isPending }
}
