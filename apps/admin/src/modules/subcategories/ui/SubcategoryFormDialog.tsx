import type { CoreRow } from '@tanstack/react-table'
import { useCallback, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { env } from '~/common/constants/env'
import { Button } from '~/common/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/common/ui/Dialog'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '~/common/ui/Field'
import { Input } from '~/common/ui/Input'
import { useSubcategoryForm } from '../hooks/useSubcategoryForm'
import type { Subcategory } from '../types/subcategory.types'

interface SubcategoryFormDialogProps {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Subcategory>['original']
	children: React.ReactNode
}

export const SubcategoryFormDialog = ({
	mode,
	defaultValues,
	children: trigger
}: SubcategoryFormDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [preview, setPreview] = useState<string | null>(
		defaultValues?.image
			? env.VITE_S3_BASE_URL + '/' + defaultValues.image
			: null
	)

	const handleClose = useCallback(() => {
		setIsOpen(false)
		setPreview(null)
	}, [])

	const { form, onSubmit, isLoading, setFile, fileError, setFileError } =
		useSubcategoryForm({
			mode,
			defaultValues,
			onClose: handleClose
		})

	const handleChangeImage = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const selectedFile = e.target.files?.[0]
			if (!selectedFile) return

			if (preview) URL.revokeObjectURL(preview)

			const url = URL.createObjectURL(selectedFile)
			setPreview(url)
			setFile(selectedFile)
			setFileError(null)
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[preview]
	)

	const handleOpenChange = useCallback(
		(open: boolean) => {
			setIsOpen(open)

			if (open) {
				if (defaultValues?.image) {
					setPreview(env.VITE_S3_BASE_URL + '/' + defaultValues.image)
				}
			} else {
				form.reset()
				setFile(null)
				setFileError(null)

				if (preview) {
					URL.revokeObjectURL(preview)
					setPreview(null)
				}
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[form, preview]
	)

	useEffect(() => {
		return () => {
			if (preview) {
				URL.revokeObjectURL(preview)
			}
		}
	}, [preview])

	const isEdit = mode === 'edit'
	const formId = `${mode}-subcategory-${defaultValues?.id || 'new'}`
	const title = isEdit
		? `Edit subcategory: ${defaultValues?.name}`
		: 'Create subcategory'

	return (
		<Dialog open={isOpen} onOpenChange={handleOpenChange}>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent aria-describedby={undefined}>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>

				<form id={formId} onSubmit={onSubmit}>
					<FieldGroup className='mb-4'>
						<Controller
							name='name'
							control={form.control}
							render={({ field, fieldState }) => {
								const isInvalid = fieldState.invalid
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Name</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											value={field.value}
											onChange={(e) => field.onChange(e.target.value)}
											onBlur={field.onBlur}
										/>
										<FieldError error={fieldState.error?.message} />
									</Field>
								)
							}}
						/>

						<Field>
							<FieldLabel htmlFor='image'>Image</FieldLabel>
							<Input
								aria-invalid={!!fileError}
								id='image'
								type='file'
								onChange={handleChangeImage}
							/>
							{!preview ? (
								<FieldDescription>
									Select an image to upload (JPG, PNG, or WebP, max 5MB)
								</FieldDescription>
							) : (
								<div className='aspect-video rounded-lg overflow-hidden max-w-80 mx-auto'>
									<img
										src={preview}
										alt='Subcategory preview'
										className='w-full h-full object-cover'
									/>
								</div>
							)}
							<FieldError error={fileError} />
						</Field>
					</FieldGroup>

					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={handleClose}
							disabled={isLoading}>
							Close
						</Button>
						<Button type='submit' isLoading={isLoading}>
							{isEdit ? 'Save' : 'Create'}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
