import { SearchInput } from '~/common/ui/Input'

interface CustomersSearchProps {
	value: string
	onChange: (value: string) => void
}

export const CustomersSearch = ({ value, onChange }: CustomersSearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

