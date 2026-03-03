import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import { PlusIcon, TrashIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { handleApiError } from '~/common/api/errorHandler'
import { Button } from '~/common/ui/Button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/common/ui/Dialog'
import { Input } from '~/common/ui/Input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import { useCreateFilterMutation } from '../hooks/useCreateFilterMutation'
import { useUpdateFilterMutation } from '../hooks/useUpdateFilterMutation'
import type { Filter, FilterSubcategory } from '../types/filters.types'

const schema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	subcategorySlug: z.string().trim().min(1, 'Subcategory is required'),
	options: z
		.array(
			z.object({
				label: z.string().trim().min(1, 'Option label is required')
			})
		)
		.min(1, 'At least one option is required')
})

type FormValues = z.infer<typeof schema>

interface FilterFormDialogProps {
	mode: 'create' | 'edit'
	subcategories: FilterSubcategory[]
	selectedSubcategorySlug: string | null
	filter?: Filter
	children: React.ReactNode
}

const DEFAULT_VALUES: FormValues = {
	name: '',
	subcategorySlug: '',
	options: [{ label: '' }]
}

export const FilterFormDialog = ({
	mode,
	subcategories,
	selectedSubcategorySlug,
	filter,
	children
}: FilterFormDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const defaultSubcategorySlug =
		selectedSubcategorySlug && selectedSubcategorySlug !== 'all'
			? selectedSubcategorySlug
			: ''

	const createMutation = useCreateFilterMutation()
	const updateMutation = useUpdateFilterMutation(filter?.id ?? '')

	const form = useForm<FormValues>({
		defaultValues: DEFAULT_VALUES,
		resolver: zodResolver(schema)
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'options'
	})

	useEffect(() => {
		if (!isOpen) return

		if (mode === 'edit' && filter) {
			form.reset({
				name: filter.name,
				subcategorySlug:
					subcategories.find((item) => item.id === filter.subcategoryId)?.slug ?? '',
				options: filter.options.map((option) => ({ label: option.label }))
			})
		} else {
			form.reset({
				...DEFAULT_VALUES,
				subcategorySlug: defaultSubcategorySlug
			})
		}
	}, [isOpen, mode, filter, form, subcategories, defaultSubcategorySlug])

	const isEdit = mode === 'edit'
	const isLoading = createMutation.isPending || updateMutation.isPending

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			const subcategorySlug =
				isEdit && filter
					? subcategories.find((item) => item.id === filter.subcategoryId)?.slug
					: values.subcategorySlug

			if (!subcategorySlug) {
				toast.error('Subcategory is required')
				return
			}

			const body = {
				name: values.name,
				value: slugify(values.name, { decamelize: false }),
				options: values.options.map((option, index) => ({
					label: option.label,
					value: slugify(option.label, { decamelize: false }),
					position: index + 1
				}))
			}

			if (isEdit && filter) {
				await updateMutation.mutateAsync(body)
				toast.success('Filter updated successfully')
			} else {
				await createMutation.mutateAsync({
					subcategorySlug,
					body
				})
				toast.success('Filter created successfully')
			}

			setIsOpen(false)
		} catch (error) {
			toast.error(handleApiError(error))
		}
	})

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-lg'>
				<DialogHeader>
					<DialogTitle>{isEdit ? 'Edit filter' : 'Create filter'}</DialogTitle>
					<DialogDescription>Manage filter and its options.</DialogDescription>
				</DialogHeader>

				<form id='filter-form' onSubmit={onSubmit} className='space-y-3'>
					<div className='space-y-1'>
						<Input placeholder='Filter name' {...form.register('name')} />
						{form.formState.errors.name?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.name.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Controller
							control={form.control}
							name='subcategorySlug'
							render={({ field }) => (
								<Select
									value={field.value}
									onValueChange={field.onChange}
									disabled={isEdit}>
									<SelectTrigger>
										<SelectValue placeholder='Select subcategory' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{subcategories.map((subcategory) => (
												<SelectItem key={subcategory.id} value={subcategory.slug}>
													{subcategory.name}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						/>
						{form.formState.errors.subcategorySlug?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.subcategorySlug.message}
							</p>
						)}
					</div>

					<div className='space-y-2'>
						<p className='text-sm font-medium'>Options</p>
						{fields.map((field, index) => (
							<div key={field.id} className='flex gap-2 items-start'>
								<Input
									placeholder={`Option #${index + 1}`}
									{...form.register(`options.${index}.label`)}
								/>
								<Button
									type='button'
									variant='destructive'
									size='icon'
									onClick={() => remove(index)}
									disabled={fields.length === 1}>
									<TrashIcon />
								</Button>
							</div>
						))}
						<Button
							type='button'
							variant='secondary'
							onClick={() => append({ label: '' })}>
							<PlusIcon />
							Add option
						</Button>
					</div>
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline'>
							Cancel
						</Button>
					</DialogClose>
					<Button form='filter-form' type='submit' isLoading={isLoading}>
						{isEdit ? 'Update' : 'Create'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
