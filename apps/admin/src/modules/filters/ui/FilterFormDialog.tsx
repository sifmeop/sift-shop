import { PlusIcon, TrashIcon } from 'lucide-react'
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
import { FilterType, filterTypeKeys, type Filter } from '../types/filters.types'

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
												placeholder='Brand'
											/>
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)
								}}
							/>
							<form.Field
								name='type'
								children={(field) => {
									const isInvalid = !field.state.meta.isValid

									return (
										<Field className='space-x-2' data-invalid={isInvalid}>
											<FieldLabel htmlFor={field.name}>Type</FieldLabel>
											<Select
												name={field.name}
												value={field.state.value}
												onValueChange={(value) =>
													field.handleChange(value as FilterType)
												}>
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
											<FieldError errors={field.state.meta.errors} />
										</Field>
									)
								}}
							/>
							<form.Field
								name='options'
								mode='array'
								children={(field) => {
									return (
										<div className='space-y-2'>
											<FieldLabel>Options</FieldLabel>
											<div className='space-y-4'>
												{field.state.value.map((_, index) => (
													<div
														key={index}
														className='border p-3 rounded space-y-2 bg-background'>
														<form.Field
															name={`options[${index}].label`}
															children={(subField) => {
																const isInvalid = !subField.state.meta.isValid
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
																			value={subField.state.value}
																			onChange={(e) =>
																				subField.handleChange(e.target.value)
																			}
																			onBlur={subField.handleBlur}
																			placeholder='Apple'
																		/>
																		<FieldError
																			errors={subField.state.meta.errors}
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
																onClick={() => field.removeValue(index)}>
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
												onClick={() => field.pushValue({ label: '' })}>
												<PlusIcon />
											</Button>
										</div>
									)
								}}
							/>
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
