import { Link, useLocation } from '@tanstack/react-router'
import {
	LayoutDashboardIcon,
	ListIcon,
	ShoppingBasketIcon,
	ShoppingCartIcon,
	StarIcon,
	User2,
	UsersIcon,
	type LucideIcon
} from 'lucide-react'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from '~/common/ui/Sidebar'
import type { FileRouteTypes } from '~/global/routeTree.gen'

interface Link {
	title: string
	href: FileRouteTypes['to']
	icon: LucideIcon
}

const LINKS: Link[] = [
	{
		title: 'Dashboard',
		href: '/dashboard',
		icon: LayoutDashboardIcon
	},
	{
		title: 'Categories',
		href: '/categories',
		icon: ListIcon
	},
	{
		title: 'Products',
		href: '/products',
		icon: ShoppingBasketIcon
	},
	{
		title: 'Orders',
		href: '/orders',
		icon: ShoppingCartIcon
	},
	{
		title: 'Customers',
		href: '/customers',
		icon: UsersIcon
	},
	{
		title: 'Reviews',
		href: '/reviews',
		icon: StarIcon
	}
]

export const AppSidebar = () => {
	const { pathname } = useLocation()

	return (
		<Sidebar collapsible='icon'>
			<SidebarHeader className='my-4 mb-0'>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<img
								src='/assets/images/logo.svg'
								alt='logo'
								className='w-4 h-6.5'
							/>
							<span className='text-2xl font-extrabold '>Admin</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Pages</SidebarGroupLabel>
					<SidebarMenu>
						{LINKS.map(({ title, href, icon: Icon }) => (
							<SidebarMenuItem key={href}>
								<SidebarMenuButton asChild isActive={pathname === href}>
									<Link to={href}>
										<Icon />
										{title}
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton>
							<User2 /> {'sifmeop@gmail.com'}
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
