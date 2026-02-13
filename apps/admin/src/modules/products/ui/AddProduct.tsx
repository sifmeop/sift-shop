import { useNavigate } from '@tanstack/react-router'
import { Button } from '~/common/ui/Button'

export const AddProduct = () => {
	const navigate = useNavigate()

	return (
		<Button
			variant='secondary'
			onClick={() => navigate({ to: '/products/form' })}>
			Add
		</Button>
	)
}
