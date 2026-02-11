import { useLocation } from '@tanstack/react-router'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from '~/common/ui/Breadcrumb'
import { LanguageSwitcher } from '~/common/ui/LanguageSwitcher'
import { Separator } from '~/common/ui/Separator'
import { SidebarTrigger } from '~/common/ui/Sidebar'
import { ThemeToggle } from '~/common/ui/ThemeToggle'
import { capitalize } from '~/common/utils/capitalize'
import { LogoutButton } from '~/modules/logout'

export const Header = () => {
	const { pathname } = useLocation()

	const title = pathname.split('/')[1]

	return (
		<header className='flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b border-b-border'>
			<div className='flex items-center gap-2 px-4 flex-1'>
				<SidebarTrigger className='-ml-1' />
				<Separator
					orientation='vertical'
					className='mr-2 data-[orientation=vertical]:h-4'
				/>
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem className='hidden md:block'>Admin</BreadcrumbItem>
						<BreadcrumbSeparator className='hidden md:block' />
						<BreadcrumbItem>
							<BreadcrumbPage className='font-semibold'>
								{capitalize(title)}
							</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				<div className='flex-1' />
				<div className='flex gap-2'>
					<ThemeToggle />
					<LanguageSwitcher />
					<LogoutButton />
				</div>
			</div>
		</header>
	)
}
