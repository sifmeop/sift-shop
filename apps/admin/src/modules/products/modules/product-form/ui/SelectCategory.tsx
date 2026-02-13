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

interface SelectCategoryProps {
	form: any
}

export const SelectCategory = ({ form }: SelectCategoryProps) => {
	const { data: categories } = useGetCategoriesQuery()

	return (
		<form.Field
			name='category'
			children={(field) => {
				const isInvalid =
					field.state.meta.isTouched && !field.state.meta.isValid
				return (
					<Field aria-invalid={isInvalid}>
						<FieldLabel>Category</FieldLabel>
						<Select
							name={field.name}
							value={field.state.value}
							onValueChange={field.handleChange}>
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
						{isInvalid && <FieldError errors={field.state.meta.errors} />}
					</Field>
				)
			}}
		/>
	)
}
