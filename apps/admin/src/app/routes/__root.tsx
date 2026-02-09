import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Suspense } from 'react'
import type { UserContext } from '~/common/contexts/AuthProvider'

export const Route = createRootRouteWithContext<UserContext>()({
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

			<TanStackRouterDevtools position='bottom-right' />
		</>
	)
}
