import { useIntlayer } from 'react-intlayer'

export const NameHeader = () => {
	const content = useIntlayer('categories')
	return <span>{content.table.name}</span>
}
