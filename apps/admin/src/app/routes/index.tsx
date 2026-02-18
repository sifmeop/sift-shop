import { createFileRoute, redirect } from '@tanstack/react-router'
import { HomePage } from '~/pages/home'
import { AuthLayout } from '../layouts/auth'

export const Route = createFileRoute('/')({
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: '/dashboard' })
		}
	},
	component: RootComponent
})

function RootComponent() {
	return (
		<AuthLayout>
			<HomePage />
		</AuthLayout>
	)
}
