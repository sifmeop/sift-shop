import { SearchInput } from '~/common/ui/Input'

interface OrdersSearchProps {
	value: string
	onChange: (value: string) => void
}

export const OrdersSearch = ({ value, onChange }: OrdersSearchProps) => {
	return (
		<SearchInput
			value={value}
			onChange={(event) => onChange(event.target.value)}
		/>
	)
}

