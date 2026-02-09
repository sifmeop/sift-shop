import { IntlayerProvider } from 'react-intlayer'
import { AuthProvider } from '~/common/contexts/AuthProvider'
import { TanstackQueryProvider } from './TanstackQueryProvider'
import { TanstackRouterProvider } from './TanstackRouterProvider'

export const Providers = () => {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<IntlayerProvider>
					<TanstackRouterProvider />
				</IntlayerProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
