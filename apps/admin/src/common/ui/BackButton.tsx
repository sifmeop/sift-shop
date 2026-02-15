import { useNavigate } from '@tanstack/react-router'
import type { VariantProps } from 'class-variance-authority'
import { ArrowLeftIcon } from 'lucide-react'
import type { FileRouteTypes } from '~/global/routeTree.gen'
import { Button, buttonVariants } from './Button'

interface BackButtonProps extends VariantProps<typeof buttonVariants> {
	to: FileRouteTypes['to']
}

export const BackButton = ({ to, variant = 'outline' }: BackButtonProps) => {
	const navigate = useNavigate()

	return (
		<Button
			variant={variant}
			onClick={() => navigate({ to })}
			className='flex items-center gap-3 w-fit'>
			<ArrowLeftIcon />
			<span className='font-medium'>Back</span>
		</Button>
	)
}
