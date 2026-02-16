import { Controller, useFormContext } from 'react-hook-form'
import { Field, FieldError, FieldLabel } from '~/common/ui/Field'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import { useGetCategoriesQuery } from '~/modules/categories'
import type { ProductSchema } from '../schemas/product.schema'

export const SelectCategory = () => {
	const { data: categories } = useGetCategoriesQuery()
	const { control } = useFormContext<ProductSchema>()

	return (
		<Controller
			name='category'
			control={control}
			render={({ field, fieldState }) => {
				const isInvalid = fieldState.invalid
				return (
					<Field aria-invalid={isInvalid}>
						<FieldLabel>Category</FieldLabel>
						<Select
							name={field.name}
							value={field.value?.slug}
							onValueChange={(value) => {
								const category = categories!.find((c) => c.slug === value)!

								field.onChange({
									id: category.id,
									name: category.name,
									slug: value
								})
							}}>
							<SelectTrigger aria-invalid={isInvalid}>
								<SelectValue placeholder='Select category' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{categories?.map(({ name, slug }) => (
										<SelectItem key={slug} value={slug}>
											{name}
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
	)
}
