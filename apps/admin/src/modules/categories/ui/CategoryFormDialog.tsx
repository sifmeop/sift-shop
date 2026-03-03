import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
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
import { cn } from '~/common/utils/cn'
import { useCreateCategoryMutation } from '../hooks/useCreateCategoryMutation'
import { useUpdateCategoryMutation } from '../hooks/useUpdateCategoryMutation'
import type { Category } from '../types/category.types'

const schema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	slug: z.string().trim().min(1, 'Slug is required')
})

type FormValues = z.infer<typeof schema>

interface CategoryFormDialogProps {
	mode: 'create' | 'edit'
	defaultValues?: Pick<Category, 'id' | 'name' | 'slug'>
	children: React.ReactNode
}

const EMPTY_VALUES: FormValues = {
	name: '',
	slug: ''
}

export const CategoryFormDialog = ({
	mode,
	defaultValues,
	children
}: CategoryFormDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const createMutation = useCreateCategoryMutation()
	const updateMutation = useUpdateCategoryMutation(defaultValues?.id ?? '')
	const form = useForm<FormValues>({
		defaultValues: EMPTY_VALUES,
		resolver: zodResolver(schema)
	})

	useEffect(() => {
		if (!isOpen) return

		if (mode === 'edit' && defaultValues) {
			form.reset({
				name: defaultValues.name,
				slug: defaultValues.slug
			})
		} else {
			form.reset(EMPTY_VALUES)
		}
	}, [isOpen, mode, defaultValues, form])

	const isLoading = createMutation.isPending || updateMutation.isPending
	const isEdit = mode === 'edit'

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			if (isEdit && defaultValues) {
				await updateMutation.mutateAsync(values)
				toast.success('Category updated successfully')
			} else {
				await createMutation.mutateAsync(values)
				toast.success('Category created successfully')
			}

			setIsOpen(false)
		} catch (error) {
			toast.error(handleApiError(error))
		}
	})

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				className={cn('sm:max-w-md', {
					'pointer-events-none opacity-80': isLoading
				})}>
				<DialogHeader>
					<DialogTitle>{isEdit ? 'Edit category' : 'Create category'}</DialogTitle>
					<DialogDescription>Set category name and slug.</DialogDescription>
				</DialogHeader>

				<form id='category-form' onSubmit={onSubmit} className='space-y-3'>
					<div className='space-y-1'>
						<Input
							placeholder='Name'
							{...form.register('name', {
								onChange: (event) => {
									if (!isEdit) {
										form.setValue(
											'slug',
											slugify(String(event.target.value), { decamelize: false })
										)
									}
								}
							})}
						/>
						{form.formState.errors.name?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.name.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Input placeholder='Slug' {...form.register('slug')} />
						{form.formState.errors.slug?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.slug.message}
							</p>
						)}
					</div>
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline'>
							Cancel
						</Button>
					</DialogClose>
					<Button form='category-form' type='submit' isLoading={isLoading}>
						{isEdit ? 'Update' : 'Create'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

