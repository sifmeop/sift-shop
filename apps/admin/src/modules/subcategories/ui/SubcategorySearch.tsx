import { SearchInput } from '~/common/ui/Input'

interface SubcategorySearchProps {
	value: string
	onChange: (value: string) => void
}

export const SubcategorySearch = ({ value, onChange }: SubcategorySearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

