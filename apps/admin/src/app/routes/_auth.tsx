import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || '/'
	}),
	beforeLoad: ({ context, location }) => {
		const isAuthenticated = !!context.user?.id

		console.debug('isAuthenticated', isAuthenticated)

		if (!isAuthenticated) {
			throw redirect({
				to: '/',
				search: {
					redirect: location.href
				}
			})
		}
	},
	component: RouteComponent
})

function RouteComponent() {
	return (
		<div>
			<Outlet />
		</div>
	)
}
