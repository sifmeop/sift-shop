import { useIntlayer } from 'react-intlayer'

export const NameHeader = () => {
	const content = useIntlayer('categories')
	return <p>{content.table.name}</p>
}
