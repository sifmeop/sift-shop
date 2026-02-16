import { useFormContext } from 'react-hook-form'
import { FieldGroup } from '~/common/ui/Field'
import type { ProductSchema } from '../../schemas/product.schema'
import { SelectCategory } from '../SelectCategory'
import { SelectSubcategory } from '../SelectSubcategory'

export const ProductCategory = () => {
	const { watch } = useFormContext<ProductSchema>()

	const category = watch('category')

	return (
		<FieldGroup>
			<SelectCategory />
			{category && <SelectSubcategory category={category.slug} />}
		</FieldGroup>
	)
}
