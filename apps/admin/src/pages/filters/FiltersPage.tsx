import { FiltersScreen } from '~/modules/filters'

interface FiltersPageProps {
	initialSubcategorySlug?: string
}

export const FiltersPage = ({ initialSubcategorySlug }: FiltersPageProps) => {
	return <FiltersScreen initialSubcategorySlug={initialSubcategorySlug} />
}
