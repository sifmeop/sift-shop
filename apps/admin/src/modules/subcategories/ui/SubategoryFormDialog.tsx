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
import { useSubcategoryForm } from '../hooks/useSubcategoryForm'
import type { Subcategory } from '../types/subcategory.types'

interface SubcategoryDialogProps {
	mode: 'create' | 'edit'
	defaultValues?: CoreRow<Subcategory>['original']
	children: React.ReactNode
}

export const SubcategoryDialog = ({
	mode,
	defaultValues,
	children: trigger
}: SubcategoryDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { form, onSubmit, isLoading } = useSubcategoryForm({
		mode,
		defaultValues,
		onClose: () => setIsOpen(false)
	})

	const isEdit = mode === 'edit'

	const formId = `${mode}-subcategory-${defaultValues?.id}`

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
								? `Edit subcategory: ${defaultValues?.name}`
								: 'Create subcategory'}
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
