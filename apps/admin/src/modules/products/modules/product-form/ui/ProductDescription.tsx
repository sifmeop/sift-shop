import { useStore } from '@tanstack/react-form'
import { Field, FieldDescription, FieldLabel } from '~/common/ui/Field'
import { Textarea } from '~/common/ui/Textarea'
import { useFormContext } from '../contexts/form-context'

export const ProductDescription = () => {
	const form = useFormContext()
	const description = useStore(form.store, (state) => state.values.description)

	return (
		<>
			<form.Field
				name='description'
				children={(field) => {
					const isInvalid =
						field.state.meta.isTouched && !field.state.meta.isValid
					return (
						<Field aria-invalid={isInvalid}>
							<FieldLabel>Description</FieldLabel>
							<Textarea
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
								maxLength={500}
								className='resize-none h-50'
								placeholder='Description...'
							/>
							<FieldDescription className='text-end'>
								0/{description.length}
							</FieldDescription>
						</Field>
					)
				}}
			/>
		</>
	)
}
