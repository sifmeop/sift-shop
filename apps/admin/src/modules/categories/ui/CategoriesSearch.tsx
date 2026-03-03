import { SearchInput } from '~/common/ui/Input'

interface CategoriesSearchProps {
	value: string
	onChange: (value: string) => void
}

export const CategoriesSearch = ({ value, onChange }: CategoriesSearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

