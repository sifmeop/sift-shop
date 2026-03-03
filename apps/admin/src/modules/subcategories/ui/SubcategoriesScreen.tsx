import { useNavigate } from '@tanstack/react-router'
import { useMemo, useState } from 'react'
import { Route } from '~/app/routes/_auth/categories/$slug'
import { handleApiError } from '~/common/api/errorHandler'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { useGetCategoriesQuery } from '~/modules/categories'
import { useGetSubcategoriesQuery } from '../hooks/useGetSubcategoriesQuery'
import { SubcategoriesHeader } from './SubcategoriesHeader'
import { SubcategoriesTable } from './SubcategoriesTable'

export const SubcategoriesScreen = () => {
	const navigate = useNavigate()
	const { slug } = Route.useParams()
	const [searchValue, setSearchValue] = useState('')
	const {
		data: categories = [],
		isLoading: isCategoriesLoading,
		isError: isCategoriesError,
		error: categoriesError
	} = useGetCategoriesQuery()
	const {
		data: subcategories = [],
		isLoading: isSubcategoriesLoading,
		isError: isSubcategoriesError,
		error: subcategoriesError
	} = useGetSubcategoriesQuery(slug)

	const filteredRows = useMemo(() => {
		const normalizedSearch = searchValue.trim().toLowerCase()
		if (!normalizedSearch) return subcategories

		return subcategories.filter((subcategory) => {
			const values = [subcategory.name, subcategory.slug].join(' ')
			return values.toLowerCase().includes(normalizedSearch)
		})
	}, [subcategories, searchValue])

	if (isCategoriesLoading || isSubcategoriesLoading) return <CenterLoader />
	if (isCategoriesError) return <div>{handleApiError(categoriesError)}</div>
	if (isSubcategoriesError) return <div>{handleApiError(subcategoriesError)}</div>

	return (
		<>
			<SubcategoriesHeader
				categorySlug={slug}
				onCategoryChange={(nextSlug) =>
					navigate({ to: '/categories/$slug', params: { slug: nextSlug } })
				}
				categories={categories}
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				isCategoriesLoading={isCategoriesLoading}
			/>
			<SubcategoriesTable categorySlug={slug} rows={filteredRows} />
		</>
	)
}

