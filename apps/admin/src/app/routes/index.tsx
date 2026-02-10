import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '~/pages/home'
import { AuthLayout } from '../layouts/auth'

export const Route = createFileRoute('/')({
	component: RootComponent
})

function RootComponent() {
	return (
		<AuthLayout>
			<HomePage />
		</AuthLayout>
	)
}
