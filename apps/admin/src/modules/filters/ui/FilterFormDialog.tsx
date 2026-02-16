import { PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFieldArray } from 'react-hook-form'
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import { capitalize } from '~/common/utils/capitalize'
import { useFilterForm } from '../hooks/useFilterForm'
import { filterTypeKeys, type Filter } from '../types/filters.types'

interface FilterDialogProps {
	mode: 'create' | 'edit'
	defaultValues?: Filter
	children: React.ReactNode
}

export const FilterFormDialog = ({
	mode,
	defaultValues,
	children: trigger
}: FilterDialogProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const { form, onSubmit, isLoading } = useFilterForm({
		mode,
		defaultValues,
		onClose: () => setIsOpen(false)
	})

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: 'options'
	})

	const isEdit = mode === 'edit'
	const formId = `${mode}-filter-${defaultValues?.id}`

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
							{isEdit ? `Edit filter: ${defaultValues?.name}` : 'Create filter'}
							{isEdit && <DialogDescription></DialogDescription>}
						</DialogTitle>
					</DialogHeader>
					<div className='no-scrollbar -mx-4 max-h-[50vh] overflow-y-auto px-4'>
						<FieldGroup>
							<Controller
								name='name'
								control={form.control}
								render={({ field, fieldState }) => {
									const isInvalid = fieldState.invalid
									return (
										<Field className='space-x-2' data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Name</FieldLabel>
											<Input
												aria-invalid={isInvalid}
												id={field.name}
												name={field.name}
												value={field.value}
												onChange={(e) => field.onChange(e.target.value)}
												onBlur={field.onBlur}
												placeholder='Brand'
											/>
											<FieldError error={fieldState.error?.message} />
										</Field>
									)
								}}
							/>

							<Controller
								name='type'
								control={form.control}
								render={({ field, fieldState }) => {
									const isInvalid = fieldState.invalid
									return (
										<Field className='space-x-2' data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Type</FieldLabel>
											<Select
												name={field.name}
												value={field.value}
												onValueChange={(value) => field.onChange(value)}>
												<SelectTrigger aria-invalid={isInvalid}>
													<SelectValue placeholder='Select type' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{filterTypeKeys.map((type) => (
															<SelectItem key={type} value={type}>
																{capitalize(type)}
															</SelectItem>
														))}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FieldError error={fieldState.error?.message} />
										</Field>
									)
								}}
							/>

							<div className='space-y-2'>
								<FieldLabel>Options</FieldLabel>
								<div className='space-y-4'>
									{fields.map((field, index) => (
										<div
											key={field.id}
											className='border p-3 rounded space-y-2 bg-background'>
											<Controller
												name={`options.${index}.label`}
												control={form.control}
												render={({
													field: subField,
													fieldState: subFieldState
												}) => {
													const isInvalid = subFieldState.invalid
													return (
														<Field
															className='space-x-2'
															data-invalid={isInvalid}>
															<FieldLabel htmlFor={subField.name}>
																Name
															</FieldLabel>
															<Input
																aria-invalid={isInvalid}
																id={subField.name}
																name={subField.name}
																value={subField.value}
																onChange={(e) =>
																	subField.onChange(e.target.value)
																}
																onBlur={subField.onBlur}
																placeholder='Apple'
															/>
															<FieldError
																error={subFieldState.error?.message}
															/>
														</Field>
													)
												}}
											/>
											{index !== 0 && (
												<Button
													fullWidth
													type='button'
													variant='destructive'
													onClick={() => remove(index)}>
													<TrashIcon />
												</Button>
											)}
										</div>
									))}
								</div>
								<Button
									fullWidth
									type='button'
									variant='secondary'
									onClick={() => append({ label: '' })}>
									<PlusIcon />
								</Button>
							</div>
						</FieldGroup>
					</div>
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
