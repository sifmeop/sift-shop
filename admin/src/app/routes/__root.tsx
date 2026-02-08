import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Suspense } from 'react'

export const Route = createRootRoute({
	component: RootComponent,
	errorComponent: () => <div>404</div>,
	pendingComponent: () => <div>Loading...</div>,
	notFoundComponent: () => <div>404</div>
})

function RootComponent() {
	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Outlet />
			</Suspense>

			<TanStackRouterDevtools />
		</>
	)
}
