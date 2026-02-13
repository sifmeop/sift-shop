import { Link } from '@tanstack/react-router'
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

interface SelectSubcategoryProps {
	form: any
	category: string
}

export const SelectSubcategory = ({
	form,
	category
}: SelectSubcategoryProps) => {
	const { data: subcategories, isLoading } = useGetSubcategoriesQuery(category)

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
		<form.Field
			name='subcategory'
			children={(field) => {
				const isInvalid =
					field.state.meta.isTouched && !field.state.meta.isValid
				return (
					<Field aria-invalid={isInvalid}>
						<FieldLabel>Subcategory</FieldLabel>
						<Select
							name={field.name}
							value={field.state.value}
							onValueChange={field.handleChange}>
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
						{isInvalid && <FieldError errors={field.state.meta.errors} />}
					</Field>
				)
			}}
		/>
	)
}
