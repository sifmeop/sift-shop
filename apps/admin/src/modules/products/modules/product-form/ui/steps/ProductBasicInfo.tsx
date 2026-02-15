import { useStore } from '@tanstack/react-form'
import { Show } from '~/common/ui/Show'
import { useFormContext } from '../../contexts/form-context'
import { ProductDescription } from '../ProductDescription'
import { SelectCategory } from '../SelectCategory'
import { SelectSubcategory } from '../SelectSubcategory'

export const ProductBasicInfo = () => {
	const form = useFormContext()
	const category = useStore(form.store, (state) => state.values.category)
	const subcategory = useStore(form.store, (state) => state.values.subcategory)

	return (
		<>
			<SelectCategory />
			<Show when={!!category}>
				<SelectSubcategory category={category} />
			</Show>
			<Show when={!!subcategory}>
				<ProductDescription />
			</Show>
		</>
	)
}
