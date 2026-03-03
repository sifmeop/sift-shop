import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { env } from '~/common/constants/env'
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
import { useCreateSubcategoryMutation } from '../hooks/useCreateSubcategoryMutation'
import { useUpdateSubcategoryMutation } from '../hooks/useUpdateSubcategoryMutation'
import type { Subcategory } from '../types/subcategory.types'

const schema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	slug: z.string().trim().min(1, 'Slug is required'),
	image: z.custom<FileList | undefined>().optional()
})

type FormValues = z.infer<typeof schema>

interface SubcategoryFormDialogProps {
	mode: 'create' | 'edit'
	categorySlug: string
	defaultValues?: Pick<Subcategory, 'id' | 'name' | 'slug' | 'image'>
	children: React.ReactNode
}

const EMPTY_VALUES: FormValues = {
	name: '',
	slug: '',
	image: undefined
}

export const SubcategoryFormDialog = ({
	mode,
	categorySlug,
	defaultValues,
	children
}: SubcategoryFormDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const createMutation = useCreateSubcategoryMutation(categorySlug)
	const updateMutation = useUpdateSubcategoryMutation(
		defaultValues?.id ?? '',
		categorySlug
	)
	const form = useForm<FormValues>({
		defaultValues: EMPTY_VALUES,
		resolver: zodResolver(schema)
	})

	useEffect(() => {
		if (!isOpen) return

		if (mode === 'edit' && defaultValues) {
			form.reset({
				name: defaultValues.name,
				slug: defaultValues.slug,
				image: undefined
			})
		} else {
			form.reset(EMPTY_VALUES)
		}
	}, [isOpen, mode, defaultValues, form])

	const isLoading = createMutation.isPending || updateMutation.isPending
	const isEdit = mode === 'edit'
	const previewImage = useMemo(() => {
		if (!isEdit || !defaultValues?.image) return null
		return env.VITE_S3_BASE_URL + defaultValues.image
	}, [isEdit, defaultValues])

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			const body = new FormData()
			body.append('name', values.name)
			body.append('slug', values.slug)

			const files = values.image
			if (files && files.length > 0) {
				body.append('files', files[0])
			}

			if (!isEdit && (!files || files.length === 0)) {
				toast.error('Image is required for creating subcategory')
				return
			}

			if (isEdit && defaultValues) {
				await updateMutation.mutateAsync(body)
				toast.success('Subcategory updated successfully')
			} else {
				await createMutation.mutateAsync(body)
				toast.success('Subcategory created successfully')
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
					<DialogTitle>
						{isEdit ? 'Edit subcategory' : 'Create subcategory'}
					</DialogTitle>
					<DialogDescription>Set subcategory fields and upload image.</DialogDescription>
				</DialogHeader>

				<form id='subcategory-form' onSubmit={onSubmit} className='space-y-3'>
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

					{previewImage && (
						<img
							src={previewImage}
							alt='Subcategory'
							className='h-28 w-28 rounded-md border object-cover'
						/>
					)}

					<Input type='file' accept='image/*' {...form.register('image')} />
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline'>
							Cancel
						</Button>
					</DialogClose>
					<Button form='subcategory-form' type='submit' isLoading={isLoading}>
						{isEdit ? 'Update' : 'Create'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

