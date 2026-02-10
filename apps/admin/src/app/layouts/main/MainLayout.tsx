import { SidebarInset, SidebarProvider } from '~/common/ui/Sidebar'
import { AppSidebar } from './AppSidebar'
import { Header } from './Header'

export const MainLayout = ({ children }: React.PropsWithChildren) => {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<Header />
				<main className='flex-1 p-4'>{children}</main>
			</SidebarInset>
		</SidebarProvider>
	)
}
