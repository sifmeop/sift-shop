import { Link } from '@tanstack/react-router'
import { Controller, useFormContext } from 'react-hook-form'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { Field, FieldError, FieldLabel } from '~/common/ui/Field'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import { useGetSubcategoriesQuery } from '~/modules/subcategories'
import type { ProductSchema } from '../schemas/product.schema'

interface SelectSubcategoryProps {
	category: string
}

export const SelectSubcategory = ({ category }: SelectSubcategoryProps) => {
	const { data: subcategories, isLoading } = useGetSubcategoriesQuery(category)
	const { control } = useFormContext<ProductSchema>()

	if (isLoading) {
		return <CenterLoader />
	}

	if (!subcategories || subcategories?.length === 0) {
		return (
			<Link
				to='/categories/$slug'
				params={{ slug: category }}
				className='text-center py-2'>
				You don&apos;t have subcategories,{' '}
				<span className='underline'>click</span> here to create
			</Link>
		)
	}

	return (
		<Controller
			name='subcategory'
			control={control}
			render={({ field, fieldState }) => {
				const isInvalid = fieldState.invalid
				return (
					<Field aria-invalid={isInvalid}>
						<FieldLabel>Subcategory</FieldLabel>
						<Select
							name={field.name}
							value={field.value?.slug}
							onValueChange={(value) => {
								const category = subcategories!.find((c) => c.slug === value)!

								field.onChange({
									id: category.id,
									name: category.name,
									slug: value
								})
							}}>
							<SelectTrigger aria-invalid={isInvalid}>
								<SelectValue placeholder='Select subcategory' />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{subcategories?.map(({ name, slug }) => (
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
