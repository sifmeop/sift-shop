import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { MainLayout } from '../layouts/main'

export const Route = createFileRoute('/_auth')({
	beforeLoad: ({ context, location }) => {
		if (context.auth?.isLoading) return

		if (!context.auth?.isAuthenticated) {
			throw redirect({
				to: '/',
				search: { redirect: location.href }
			})
		}
	},
	component: RootComponent
})

function RootComponent() {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
}
