import { useIntlayer } from 'react-intlayer'

export const ActionsHeader = () => {
	const content = useIntlayer('categories')
	return <p className='text-end'>{content.table.actions}</p>
}
