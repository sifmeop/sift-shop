import { SearchInput } from '~/common/ui/Input'

interface FiltersSearchProps {
	value: string
	onChange: (value: string) => void
}

export const FiltersSearch = ({ value, onChange }: FiltersSearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

