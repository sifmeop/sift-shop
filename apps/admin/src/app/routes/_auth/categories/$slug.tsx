import { createFileRoute } from '@tanstack/react-router'
import { SubcategoriesPage } from '~/pages/subcategories'

export const Route = createFileRoute('/_auth/categories/$slug')({
	component: SubcategoriesPage
})
