import { useIntlayer } from 'react-intlayer'

export const ProductsCountHeader = () => {
	const content = useIntlayer('categories')
	return <p>{content.table.productsCount}</p>
}
