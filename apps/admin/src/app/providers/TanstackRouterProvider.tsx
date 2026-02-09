import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from '~/common/contexts/AuthProvider'
import { routeTree } from '~/global/routeTree.gen'

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const router = createRouter({
	routeTree,
	context: {
		user: null
	}
})

export const TanstackRouterProvider = () => {
	const { user } = useAuth()

	return <RouterProvider router={router} context={{ user }} />
}
