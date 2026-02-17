import { Link } from '@tanstack/react-router'
import { Controller, useFormContext } from 'react-hook-form'
import { CenterLoader } from '~/common/ui/CenterLoader'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '~/common/ui/Select'
import { Separator } from '~/common/ui/Separator'
import { useGetFiltersQuery } from '~/modules/filters'
import type { ProductSchema } from '../../schemas/product.schema'

export const ProductFilters = () => {
	const { getValues, control } = useFormContext<ProductSchema>()
	const subcategory = getValues('subcategory').slug
	const { data, isLoading } = useGetFiltersQuery(subcategory)

	if (isLoading) {
		return <CenterLoader />
	}

	if (!data || data.length === 0) {
		return (
			<Link
				to='/filters/$slug'
				params={{ slug: subcategory }}
				className='text-center py-2'>
				<div className='text-center py-2'>
					You don&apos;t have filters, <span className='underline'>click</span>{' '}
					here to create
				</div>
			</Link>
		)
	}

	const filtersWithoutPrice = data.filter((f) => f.slug !== 'price')

	return (
		<div className='space-y-2'>
			{filtersWithoutPrice.map(({ id, name, options }, index) => (
				<div
					key={id}
					className='rounded-lg border border-border grid grid-cols-[1fr_1px_1fr]'>
					<div className='font-medium leading-9 px-4 py-2 text-sm'>{name}</div>
					<Separator orientation='vertical' />
					<div className='p-2'>
						<Controller
							name={`filters.${index}`}
							control={control}
							render={({ field, fieldState }) => (
								<Select
									defaultValue={field.value?.value}
									onValueChange={(value) => {
										const option = options.find((o) => o.value === value)!
										field.onChange({
											id: option.id,
											name,
											value,
											valueLabel: option.label
										})
									}}>
									<SelectTrigger
										className='w-full'
										aria-invalid={fieldState.invalid}>
										<SelectValue placeholder='Выберите опцию' />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{options.map(({ id, label, value }) => (
												<SelectItem key={id} value={value}>
													{label}
												</SelectItem>
											))}
										</SelectGroup>
									</SelectContent>
								</Select>
							)}
						/>
					</div>
				</div>
			))}
		</div>
	)
}
