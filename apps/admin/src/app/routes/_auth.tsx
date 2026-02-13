import { createFileRoute, Outlet } from '@tanstack/react-router'
import { MainLayout } from '../layouts/main'

export const Route = createFileRoute('/_auth')({
	// validateSearch: (search) => ({
	// 	redirect: (search.redirect as string) || '/'
	// }),
	// beforeLoad: ({ context, location }) => {
	// 	const isAuthenticated = !!context.user?.id

	// 	if (!isAuthenticated) {
	// 		throw redirect({
	// 			to: '/',
	// 			search: {
	// 				redirect: location.href
	// 			}
	// 		})
	// 	}
	// },
	component: RootComponent
})

function RootComponent() {
	return (
		<MainLayout>
			<Outlet />
		</MainLayout>
	)
}
