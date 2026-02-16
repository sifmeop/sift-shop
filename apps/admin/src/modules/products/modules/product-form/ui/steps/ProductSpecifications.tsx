import { PlusIcon, TrashIcon } from 'lucide-react'
import { Controller, useFieldArray, useFormContext } from 'react-hook-form'
import { Button } from '~/common/ui/Button'
import { FieldGroup } from '~/common/ui/Field'
import { Input } from '~/common/ui/Input'
import { Separator } from '~/common/ui/Separator'
import { cn } from '~/common/utils/cn'
import type { ProductSchema } from '../../schemas/product.schema'

export const ProductSpecifications = () => {
	const { control } = useFormContext<ProductSchema>()

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'specifications'
	})

	return (
		<div className='space-y-2'>
			<div>
				{fields.map(({ id }, index) => (
					<div
						key={id}
						className={cn(
							'border border-border grid grid-cols-[1fr_1px_1fr_1px_auto] items-center',
							{
								'rounded-t-lg': index === 0,
								'rounded-b-lg': index === fields.length - 1,
								'border-b-transparent': index !== fields.length - 1
							}
						)}>
						<FieldGroup className='px-2 py-2'>
							<Controller
								name={`specifications.${index}.name`}
								control={control}
								render={({ field, fieldState }) => (
									<Input
										aria-invalid={fieldState.invalid}
										id={field.name}
										name={field.name}
										value={field.value}
										onChange={(e) => field.onChange(e.target.value)}
										placeholder='Name'
									/>
								)}
							/>
						</FieldGroup>
						<Separator orientation='vertical' />
						<FieldGroup className='px-2 py-2'>
							<Controller
								name={`specifications.${index}.value`}
								control={control}
								render={({ field, fieldState }) => (
									<Input
										aria-invalid={fieldState.invalid}
										id={field.name}
										name={field.name}
										value={field.value}
										onChange={(e) => field.onChange(e.target.value)}
										placeholder='Value'
									/>
								)}
							/>
						</FieldGroup>
						<Separator orientation='vertical' />
						<Button
							type='button'
							variant='destructive'
							className='mx-2 size-9'
							onClick={() => remove(index)}>
							<TrashIcon />
						</Button>
					</div>
				))}
			</div>
			<Button
				fullWidth
				type='button'
				variant='secondary'
				onClick={() => append({ name: '', value: '' })}>
				Add specification <PlusIcon />
			</Button>
		</div>
	)
}
