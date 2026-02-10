import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Suspense } from 'react'
import type { UserContext } from '~/common/contexts/auth'

export const Route = createRootRouteWithContext<UserContext>()({
	component: RootComponent,
	errorComponent: () => <div>404</div>,
	pendingComponent: () => <div>Loading...</div>,
	notFoundComponent: () => <div>404</div>
})

function RootComponent() {
	// useAuthStateWatcher()

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				<Outlet />
			</Suspense>

			{/* <TanStackRouterDevtools position='bottom-right' /> */}
		</>
	)
}
