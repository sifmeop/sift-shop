import { useMemo, useState } from 'react'
import { handleApiError } from '~/common/api/errorHandler'
import { CenterLoader } from '~/common/ui/CenterLoader'
import { useGetFiltersQuery } from '../hooks/useGetFiltersQuery'
import { useGetFilterSubcategoriesQuery } from '../hooks/useGetFilterSubcategoriesQuery'
import { FiltersHeader } from './FiltersHeader'
import { FiltersTable } from './FiltersTable'

interface FiltersScreenProps {
	initialSubcategorySlug?: string
}

export const FiltersScreen = ({ initialSubcategorySlug }: FiltersScreenProps) => {
	const [selectedSubcategorySlug, setSelectedSubcategorySlug] = useState(
		initialSubcategorySlug ?? 'all'
	)
	const [searchValue, setSearchValue] = useState('')

	const {
		data: subcategories = [],
		isLoading: isSubcategoriesLoading,
		isError: isSubcategoriesError,
		error: subcategoriesError
	} = useGetFilterSubcategoriesQuery()
	const {
		data: filters = [],
		isLoading: isFiltersLoading,
		isError: isFiltersError,
		error: filtersError
	} = useGetFiltersQuery(
		selectedSubcategorySlug === 'all' ? null : selectedSubcategorySlug
	)

	const filteredRows = useMemo(() => {
		const normalizedSearch = searchValue.trim().toLowerCase()
		if (!normalizedSearch) return filters

		return filters.filter((filter) => {
			const values = [
				filter.name,
				filter.slug,
				...filter.options.map((option) => option.label)
			].join(' ')

			return values.toLowerCase().includes(normalizedSearch)
		})
	}, [filters, searchValue])

	if (isSubcategoriesLoading || isFiltersLoading) return <CenterLoader />
	if (isSubcategoriesError) return <div>{handleApiError(subcategoriesError)}</div>
	if (isFiltersError) return <div>{handleApiError(filtersError)}</div>

	return (
		<>
			<FiltersHeader
				searchValue={searchValue}
				onSearchChange={setSearchValue}
				subcategories={subcategories}
				selectedSubcategorySlug={selectedSubcategorySlug}
				onSubcategoryChange={setSelectedSubcategorySlug}
				isSubcategoriesLoading={isSubcategoriesLoading}
			/>
			<FiltersTable rows={filteredRows} subcategories={subcategories} />
		</>
	)
}

