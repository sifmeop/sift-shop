import { IntlayerProvider } from 'react-intlayer'
import { AuthProvider } from '~/common/contexts/auth'
import { TooltipProvider } from '~/common/ui/Tooltip'
import { TanstackQueryProvider } from './TanstackQueryProvider'
import { TanstackRouterProvider } from './TanstackRouterProvider'

export const Providers = () => {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<IntlayerProvider>
					<TooltipProvider>
						<TanstackRouterProvider />
					</TooltipProvider>
				</IntlayerProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
