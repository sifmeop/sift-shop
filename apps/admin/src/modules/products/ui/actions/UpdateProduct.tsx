import { useNavigate } from '@tanstack/react-router'
import { EditIcon } from 'lucide-react'
import { Button } from '~/common/ui/Button'

export const UpdateProduct = () => {
	const navigate = useNavigate()

	return (
		<Button
			variant='default'
			size='icon'
			color='yellow'
			onClick={() => navigate({ to: '/products/form' })}>
			<EditIcon />
		</Button>
	)
}
