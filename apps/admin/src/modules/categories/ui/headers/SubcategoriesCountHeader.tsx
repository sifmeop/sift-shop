import { useIntlayer } from 'react-intlayer'

export const SubcategoriesCountHeader = () => {
	const content = useIntlayer('categories')
	return <p>{content.table.subcategoriesCount}</p>
}
