import { Route } from '~/app/routes/_auth/categories/$categoryId'
import {
	SubcategoriesHeader,
	SubcategoriesTable
} from '~/modules/subcategories'

export const SubcategoriesPage = () => {
	const { categoryId } = Route.useParams()

	return (
		<>
			<SubcategoriesHeader />
			<SubcategoriesTable categoryId={categoryId} />
		</>
	)
}
