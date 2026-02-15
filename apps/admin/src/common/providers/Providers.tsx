import { AuthProvider } from '~/common/contexts/auth'
import { TooltipProvider } from '~/common/ui/Tooltip'
import { Toaster } from '../ui/Sonner'
import { TanstackQueryProvider } from './TanstackQueryProvider'
import { TanstackRouterProvider } from './TanstackRouterProvider'
import { ThemeProvider } from './ThemeProvider'

export const Providers = () => {
	return (
		<TanstackQueryProvider>
			<AuthProvider>
				<ThemeProvider defaultTheme='light' storageKey='theme'>
					<TooltipProvider>
						<TanstackRouterProvider />
						<Toaster position='top-right' closeButton />
					</TooltipProvider>
				</ThemeProvider>
			</AuthProvider>
		</TanstackQueryProvider>
	)
}
