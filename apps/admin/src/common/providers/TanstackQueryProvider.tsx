import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export const TanstackQueryProvider = ({
	children
}: React.PropsWithChildren) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: false,
						refetchOnWindowFocus: false,
						staleTime: Infinity
					}
				}
			})
	)

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{/* <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' /> */}
		</QueryClientProvider>
	)
}
