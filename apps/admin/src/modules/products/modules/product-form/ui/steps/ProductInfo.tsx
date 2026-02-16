import { DollarSignIcon, MinusIcon, PlusIcon } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '~/common/ui/Button'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel
} from '~/common/ui/Field'
import { Input, InputNumber } from '~/common/ui/Input'
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput
} from '~/common/ui/InputGroup'
import { Textarea } from '~/common/ui/Textarea'
import type { ProductSchema } from '../../schemas/product.schema'

export const ProductInfo = () => {
	const { control, setValue } = useFormContext<ProductSchema>()

	return (
		<div>
			<FieldGroup>
				<Controller
					name='name'
					control={control}
					render={({ field, fieldState }) => (
						<Field
							key={field.name}
							className='space-x-2'
							data-invalid={fieldState.invalid}>
							<FieldLabel htmlFor={field.name}>Name</FieldLabel>
							<Input
								aria-invalid={fieldState.invalid}
								id={field.name}
								name={field.name}
								value={field.value}
								onChange={(e) => field.onChange(e.target.value)}
								placeholder='Product name...'
							/>
							<FieldError error={fieldState.error?.message} />
						</Field>
					)}
				/>

				<Controller
					name='description'
					control={control}
					render={({ field, fieldState }) => {
						const isInvalid = fieldState.invalid

						return (
							<Field aria-invalid={isInvalid}>
								<FieldLabel>Description</FieldLabel>
								<Textarea
									value={field.value}
									onChange={(e) => field.onChange(e.target.value)}
									maxLength={500}
									className='resize-none h-45'
									placeholder='Description...'
								/>
								<FieldDescription className='text-end'>
									0/{field.value.length}
								</FieldDescription>
							</Field>
						)
					}}
				/>

				<div className='grid grid-cols-[1fr_auto] gap-4'>
					<Controller
						name='price'
						control={control}
						render={({ field, fieldState }) => (
							<Field
								key={field.name}
								className='space-x-2'
								data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Price</FieldLabel>
								<InputGroup className='max-w-xs'>
									<InputGroupAddon>
										<DollarSignIcon />
									</InputGroupAddon>
									<InputGroupInput asChild>
										<InputNumber
											allowFloat
											aria-invalid={fieldState.invalid}
											id={field.name}
											name={field.name}
											value={field.value}
											onChangeValue={field.onChange}
											placeholder='Price...'
										/>
									</InputGroupInput>
								</InputGroup>
							</Field>
						)}
					/>

					<Controller
						name='stock'
						control={control}
						render={({ field, fieldState }) => (
							<Field
								key={field.name}
								className='space-x-2'
								data-invalid={fieldState.invalid}>
								<FieldLabel htmlFor={field.name}>Stock</FieldLabel>
								<div className='grid grid-cols-[40px_100px_40px] gap-2'>
									<Button
										type='button'
										size='icon'
										onClick={() => setValue('stock', String(+field.value - 1))}
										disabled={field.value === '0'}>
										<MinusIcon />
									</Button>
									<InputNumber
										aria-invalid={fieldState.invalid}
										id={field.name}
										name={field.name}
										value={field.value}
										onChangeValue={field.onChange}
										placeholder='Stock...'
									/>
									<Button
										type='button'
										size='icon'
										onClick={() => setValue('stock', String(+field.value + 1))}>
										<PlusIcon />
									</Button>
								</div>
							</Field>
						)}
					/>
				</div>
			</FieldGroup>
		</div>
	)
}
