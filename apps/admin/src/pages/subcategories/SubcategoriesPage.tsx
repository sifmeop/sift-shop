import { useParams } from '@tanstack/react-router'
import { SubcategoriesTable } from '~/modules/subcategories'

export const SubcategoriesPage = () => {
	const { categoryId } = useParams({ from: '/_auth/categories/$categoryId' })

	return <SubcategoriesTable id={categoryId} />
}
