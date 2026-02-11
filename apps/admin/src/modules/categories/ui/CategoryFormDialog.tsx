import type { CoreRow } from '@tanstack/react-table'
import { useState } from 'react'
import { Button } from '~/common/ui/Button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '~/common/ui/Dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '~/common/ui/Field'
import { Input } from '~/common/ui/Input'
import { useCategoryForm } from '../hooks/useCategoryForm'
import type { Category } from '../types/category.types'

interface CategoryDialogProps {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Category>['original']
	children: React.ReactNode
}

export const CategoryDialog = ({
	mode,
	defaultValues,
	children: trigger
}: CategoryDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { form, onSubmit, isLoading } = useCategoryForm({
		mode,
		defaultValues,
		onClose: () => setIsOpen(false)
	})

	const isEdit = mode === 'edit'

	const formId = `${mode}-category-${defaultValues?.id}`

	return (
		<Dialog
			open={isOpen}
			onOpenChange={(open) => {
				if (!open) form.reset()
				setIsOpen(open)
			}}>
			<form id={formId} onSubmit={onSubmit}>
				<DialogTrigger asChild>{trigger}</DialogTrigger>
				<DialogContent aria-describedby={undefined}>
					<DialogHeader>
						<DialogTitle>
							{isEdit
								? `Edit category: ${defaultValues?.name}`
								: 'Create category'}
							{isEdit && <DialogDescription></DialogDescription>}
						</DialogTitle>
					</DialogHeader>
					<FieldGroup>
						<form.Field
							name='name'
							children={(field) => {
								const isInvalid = !field.state.meta.isValid

								return (
									<Field className='space-x-2' data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Name</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											value={field.state.value}
											onChange={(e) => field.handleChange(e.target.value)}
											onBlur={field.handleBlur}
										/>
										<FieldError errors={field.state.meta.errors} />
									</Field>
								)
							}}
						/>
						<form.Field
							name='slug'
							children={(field) => {
								const isInvalid = !field.state.meta.isValid

								return (
									<Field className='space-x-2' data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Slug</FieldLabel>
										<Input
											aria-invalid={isInvalid}
											id={field.name}
											name={field.name}
											value={field.state.value}
											disabled
										/>
										<FieldError errors={field.state.meta.errors} />
									</Field>
								)
							}}
						/>
					</FieldGroup>
					<DialogFooter>
						<Button
							type='button'
							variant='outline'
							onClick={() => setIsOpen(false)}>
							Close
						</Button>
						<Button form={formId} type='submit' isLoading={isLoading}>
							{isEdit ? 'Save' : 'Create'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	)
}
