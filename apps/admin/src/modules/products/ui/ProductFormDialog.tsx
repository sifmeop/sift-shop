import { zodResolver } from '@hookform/resolvers/zod'
import slugify from '@sindresorhus/slugify'
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactQuill from 'react-quill-new'
import 'react-quill-new/dist/quill.snow.css'
import { toast } from 'sonner'
import { z } from 'zod'
import { handleApiError } from '~/common/api/errorHandler'
import { env } from '~/common/constants/env'
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
import { useCreateProductMutation } from '../hooks/useCreateProductMutation'
import { useGetSubcategoryFiltersQuery } from '../hooks/useGetSubcategoryFiltersQuery'
import { useUpdateProductMutation } from '../hooks/useUpdateProductMutation'
import type { Product, ProductSubcategory } from '../types/product.types'

const specificationEntrySchema = z.object({
	key: z.string(),
	value: z.string()
})

const productSchema = z.object({
	name: z.string().trim().min(1, 'Name is required'),
	slug: z.string().trim().min(1, 'Slug is required'),
	description: z.string().optional(),
	stock: z
		.string()
		.trim()
		.min(1, 'Stock is required')
		.refine((value) => !Number.isNaN(Number(value)), {
			message: 'Stock must be a number'
		}),
	price: z.string().trim().min(1, 'Price is required'),
	subcategorySlug: z.string().trim().min(1, 'Subcategory is required'),
	specifications: z.array(specificationEntrySchema),
	filterValues: z.array(z.string()),
	existingImages: z.array(z.string()),
	images: z.array(z.instanceof(File))
})

type ProductFormValues = z.infer<typeof productSchema>

interface ProductFormDialogProps {
	mode: 'create' | 'edit'
	subcategories: ProductSubcategory[]
	product?: Product
	children: React.ReactNode
}

const defaultValues: ProductFormValues = {
	name: '',
	slug: '',
	description: '',
	stock: '',
	price: '',
	subcategorySlug: '',
	specifications: [{ key: '', value: '' }],
	filterValues: [],
	existingImages: [],
	images: []
}

const normalizeDescription = (value: string | undefined) => {
	if (!value) return ''
	if (value === '<p><br></p>') return ''
	return value
}

const mapSpecificationsToEntries = (specifications: Record<string, string>) => {
	const entries = Object.entries(specifications).map(([key, value]) => ({
		key,
		value
	}))

	return entries.length > 0 ? entries : [{ key: '', value: '' }]
}

export const ProductFormDialog = ({
	mode,
	subcategories,
	product,
	children
}: ProductFormDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isFilterValuesTouched, setIsFilterValuesTouched] = useState(false)
	const createMutation = useCreateProductMutation()
	const updateMutation = useUpdateProductMutation(product?.id ?? '')
	const form = useForm<ProductFormValues>({
		defaultValues,
		resolver: zodResolver(productSchema)
	})

	const selectedSubcategorySlug = form.watch('subcategorySlug')
	const { data: filters = [] } = useGetSubcategoryFiltersQuery(
		selectedSubcategorySlug || null
	)

	const selectableFilters = useMemo(
		() => filters.filter((filter) => filter.slug !== 'price'),
		[filters]
	)

	useEffect(() => {
		if (!isOpen) return

		if (mode === 'edit' && product) {
			const subcategorySlug =
				subcategories.find(
					(subcategory) => subcategory.id === product.subcategoryId
				)?.slug ?? ''

			form.reset({
				name: product.name,
				slug: product.slug,
				description: product.description ?? '',
				stock: String(product.stock),
				price: product.price,
				subcategorySlug,
				specifications: mapSpecificationsToEntries(
					product.specifications ?? {}
				),
				filterValues: product.filters.map((filter) => filter.id),
				existingImages: product.images ?? [],
				images: []
			})
		} else {
			form.reset(defaultValues)
		}

		setIsFilterValuesTouched(false)
	}, [isOpen, mode, product, subcategories, form])

	const isLoading = createMutation.isPending || updateMutation.isPending
	const isEdit = mode === 'edit'
	const specificationEntries = form.watch('specifications')
	const existingImages = form.watch('existingImages')
	const selectedImages = form.watch('images')
	const selectedImagePreviews = useMemo(
		() =>
			selectedImages.map((file) => ({
				name: file.name,
				url: URL.createObjectURL(file)
			})),
		[selectedImages]
	)

	useEffect(() => {
		return () => {
			selectedImagePreviews.forEach((preview) => {
				URL.revokeObjectURL(preview.url)
			})
		}
	}, [selectedImagePreviews])

	const onSubmit = form.handleSubmit(async (values) => {
		try {
			const parsedSpecifications: Record<string, string> = {}
			for (const entry of values.specifications) {
				const key = entry.key.trim()
				const value = entry.value.trim()

				if (!key) continue
				if (Object.hasOwn(parsedSpecifications, key)) {
					throw new Error(`Specification key "${key}" is duplicated`)
				}

				parsedSpecifications[key] = value
			}

			const body = new FormData()
			body.append('slug', values.slug)
			body.append('name', values.name)
			body.append('description', normalizeDescription(values.description))
			body.append('stock', values.stock)
			body.append('price', values.price)
			body.append('subcategorySlug', values.subcategorySlug)
			body.append('specifications', JSON.stringify(parsedSpecifications))

			if (!isEdit || isFilterValuesTouched) {
				body.append('filterValues', JSON.stringify(values.filterValues))
			}

			if (isEdit) {
				body.append('images', JSON.stringify(values.existingImages))
			}

			if (values.images.length > 0) {
				values.images.forEach((file) => {
					body.append('files', file)
				})
			}

			if (isEdit && product) {
				await updateMutation.mutateAsync(body)
				toast.success('Product updated successfully')
			} else {
				await createMutation.mutateAsync(body)
				toast.success('Product created successfully')
			}

			setIsOpen(false)
		} catch (error) {
			if (error instanceof Error && error.message.includes('Specification')) {
				toast.error(error.message)
				return
			}

			toast.error(handleApiError(error))
		}
	})

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent
				className={cn('sm:max-w-3xl', {
					'pointer-events-none opacity-80': isLoading
				})}>
				<DialogHeader>
					<DialogTitle>
						{isEdit ? 'Edit product' : 'Create product'}
					</DialogTitle>
					<DialogDescription>
						Fill required fields and submit product data.
					</DialogDescription>
				</DialogHeader>

				<form
					className='grid grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto py-1 px-1'
					onSubmit={onSubmit}
					id='product-form'>
					<div className='space-y-1'>
						<Input
							placeholder='Name'
							{...form.register('name', {
								onChange: (event) => {
									const name = String(event.target.value)
									if (!isEdit) {
										form.setValue('slug', slugify(name, { decamelize: false }))
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

					<div className='space-y-1'>
						<Input placeholder='Stock' {...form.register('stock')} />
						{form.formState.errors.stock?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.stock.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Input placeholder='Price' {...form.register('price')} />
						{form.formState.errors.price?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.price.message}
							</p>
						)}
					</div>

					<div className='col-span-2 space-y-1'>
						<Controller
							control={form.control}
							name='subcategorySlug'
							render={({ field }) => (
								<select
									className='border-input h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm'
									value={field.value}
									onChange={field.onChange}>
									<option value=''>Select subcategory</option>
									{subcategories.map((subcategory) => (
										<option key={subcategory.id} value={subcategory.slug}>
											{subcategory.name}
										</option>
									))}
								</select>
							)}
						/>
						{form.formState.errors.subcategorySlug?.message && (
							<p className='text-sm text-destructive'>
								{form.formState.errors.subcategorySlug.message}
							</p>
						)}
					</div>

					<div className='col-span-2 space-y-1'>
						<Controller
							control={form.control}
							name='filterValues'
							render={({ field }) => (
								<div className='space-y-2 rounded-md border p-3'>
									<p className='text-sm font-medium'>Filters</p>
									{selectableFilters.length === 0 ? (
										<p className='text-muted-foreground text-sm'>
											No filters for selected subcategory.
										</p>
									) : (
										<div className='space-y-3'>
											{selectableFilters.map((filter) => (
												<div
													key={filter.id}
													className='grid gap-2 border-b pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[180px_1fr]'>
													<p className='text-sm font-medium'>{filter.name}</p>
													<div className='flex flex-wrap gap-2'>
														{filter.options.map((option) => {
															const isChecked = field.value.includes(option.id)
															const optionIdsInGroup = filter.options.map(
																(filterOption) => filterOption.id
															)

															return (
																<label
																	key={option.id}
																	className='border-input hover:bg-muted/50 inline-flex cursor-pointer items-center gap-2 rounded-md border px-2 py-1 text-sm'>
																	<input
																		type='checkbox'
																		checked={isChecked}
																		onChange={(event) => {
																			const valuesWithoutGroup =
																				field.value.filter(
																					(value) =>
																						!optionIdsInGroup.includes(value)
																				)
																			const nextValues = event.target.checked
																				? [...valuesWithoutGroup, option.id]
																				: valuesWithoutGroup

																			setIsFilterValuesTouched(true)
																			field.onChange(nextValues)
																		}}
																	/>
																	<span>{option.label}</span>
																</label>
															)
														})}
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							)}
						/>
					</div>

					<div className='col-span-2'>
						<Controller
							control={form.control}
							name='description'
							render={({ field }) => (
								<ReactQuill
									theme='snow'
									value={field.value ?? ''}
									onChange={field.onChange}
									placeholder='Description'
									className='product-quill'
									modules={{
										toolbar: [
											[{ header: [1, 2, 3, false] }],
											['bold', 'italic', 'underline'],
											[{ list: 'ordered' }, { list: 'bullet' }],
											['link', 'image'],
											['clean']
										]
									}}
								/>
							)}
						/>
					</div>

					<div className='col-span-2 space-y-3'>
						<div className='flex items-center justify-between'>
							<p className='text-sm font-medium'>Specifications</p>
							<Button
								type='button'
								variant='outline'
								size='sm'
								onClick={() => {
									form.setValue('specifications', [
										...specificationEntries,
										{ key: '', value: '' }
									])
								}}>
								<PlusIcon />
								Add row
							</Button>
						</div>

						<div className='space-y-2'>
							{specificationEntries.map((_, index) => (
								<div
									key={`specification-${index}`}
									className='grid grid-cols-[1fr_1fr_auto] gap-2'>
									<Input
										placeholder='Key'
										{...form.register(`specifications.${index}.key`)}
									/>
									<Input
										placeholder='Value'
										{...form.register(`specifications.${index}.value`)}
									/>
									<Button
										type='button'
										variant='outline'
										size='icon'
										disabled={specificationEntries.length === 1}
										onClick={() => {
											const nextSpecifications = specificationEntries.filter(
												(_, entryIndex) => entryIndex !== index
											)

											form.setValue(
												'specifications',
												nextSpecifications.length > 0
													? nextSpecifications
													: [{ key: '', value: '' }]
											)
										}}>
										<Trash2Icon />
									</Button>
								</div>
							))}
						</div>
					</div>

					{isEdit && existingImages.length > 0 && (
						<div className='col-span-2 space-y-2'>
							<p className='text-sm font-medium'>Current images</p>
							<div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
								{existingImages.map((image, index) => (
									<div
										key={`${image}-${index}`}
										className='border-input overflow-hidden rounded-md border'>
										<img
											src={env.VITE_S3_BASE_URL + image}
											alt={`Product image ${index + 1}`}
											className='h-24 w-full object-cover'
										/>
										<div className='grid grid-cols-3 gap-1 border-t p-1'>
											<Button
												type='button'
												variant='outline'
												size='icon'
												disabled={index === 0}
												onClick={() => {
													if (index === 0) return
													const nextImages = [...existingImages]
													;[nextImages[index - 1], nextImages[index]] = [
														nextImages[index],
														nextImages[index - 1]
													]
													form.setValue('existingImages', nextImages)
												}}>
												<ArrowUpIcon />
											</Button>
											<Button
												type='button'
												variant='outline'
												size='icon'
												disabled={index === existingImages.length - 1}
												onClick={() => {
													if (index === existingImages.length - 1) return
													const nextImages = [...existingImages]
													;[nextImages[index], nextImages[index + 1]] = [
														nextImages[index + 1],
														nextImages[index]
													]
													form.setValue('existingImages', nextImages)
												}}>
												<ArrowDownIcon />
											</Button>
											<Button
												type='button'
												variant='outline'
												size='icon'
												onClick={() => {
													form.setValue(
														'existingImages',
														existingImages.filter(
															(_, imageIndex) => imageIndex !== index
														)
													)
												}}>
												<Trash2Icon />
											</Button>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					<div className='col-span-2 space-y-2'>
						<Controller
							control={form.control}
							name='images'
							render={({ field }) => (
								<Input
									type='file'
									multiple
									accept='image/*'
									onChange={(event) => {
										const files = event.target.files
										field.onChange(files ? Array.from(files) : [])
									}}
								/>
							)}
						/>
						<p className='text-muted-foreground text-xs'>
							{isEdit
								? 'If you do not select new images, files will be sent as empty and current images stay unchanged.'
								: 'You can upload multiple images.'}
						</p>
						{selectedImages.length > 0 && (
							<div className='space-y-2'>
								<div className='flex items-center justify-between'>
									<p className='text-sm font-medium'>Selected new images</p>
									<Button
										type='button'
										variant='outline'
										size='sm'
										onClick={() => form.setValue('images', [])}>
										Clear
									</Button>
								</div>
								<div className='grid grid-cols-2 gap-2 sm:grid-cols-4'>
									{selectedImagePreviews.map((preview, index) => (
										<div
											key={`${preview.name}-${index}`}
											className='border-input overflow-hidden rounded-md border'>
											<img
												src={preview.url}
												alt={preview.name}
												className='h-24 w-full object-cover'
											/>
										</div>
									))}
								</div>
							</div>
						)}
					</div>
				</form>

				<DialogFooter>
					<DialogClose asChild>
						<Button type='button' variant='outline'>
							Cancel
						</Button>
					</DialogClose>
					<Button
						form='product-form'
						type='submit'
						isLoading={isLoading}
						disabled={isLoading}>
						{isEdit ? 'Update' : 'Create'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
