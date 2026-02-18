import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from '~/common/contexts/auth'
import { routeTree } from '~/global/routeTree.gen'
import { FullScreenLoader } from '../ui/FullScreenLoader'

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const router = createRouter({
	routeTree,
	context: {
		auth: null
	}
})

export const TanstackRouterProvider = () => {
	const auth = useAuth()

	if (auth.isLoading) {
		return <FullScreenLoader />
	}

	return <RouterProvider router={router} context={{ auth }} />
}
