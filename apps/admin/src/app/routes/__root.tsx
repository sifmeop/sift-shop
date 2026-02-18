import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import type { AuthContext } from '~/common/contexts/auth'

export interface RouterContext {
	auth: AuthContext | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	errorComponent: () => <div>404</div>,
	pendingComponent: () => <div>Loading...</div>,
	notFoundComponent: () => <div>404</div>
})

function RootComponent() {
	return <Outlet />
}
