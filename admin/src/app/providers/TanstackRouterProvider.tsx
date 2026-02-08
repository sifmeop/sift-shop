import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from '~/global/routeTree.gen'

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const router = createRouter({
	routeTree
})

export const TanstackRouterProvider = () => {
	return <RouterProvider router={router} />
}
