export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'CANCELLED'

export type DashboardSummary = {
	customersCount: number
	productsCount: number
	categoriesCount: number
	ordersCount: number
	reviewsCount: number
	pendingOrdersCount: number
	lowStockProductsCount: number
	outOfStockProductsCount: number
	totalRevenue: number
	paidRevenue: number
}

export type DashboardOrderStatus = {
	status: OrderStatus
	count: number
}

export type DashboardRecentOrder = {
	id: string
	number: number
	status: OrderStatus
	totalAmount: string
	currency: string
	createdAt: Date
	customer: {
		id: string
		fullName: string
		email: string
	}
}

export type DashboardRecentCustomer = {
	id: string
	fullName: string
	email: string
	avatar: string | null
	isVerified: boolean
	createdAt: Date
}

export type DashboardRecentReview = {
	id: string
	rating: number
	comment: string | null
	createdAt: Date
	product: {
		id: string
		name: string
		slug: string
	}
	customer: {
		id: string
		fullName: string
		email: string
	}
}

export type DashboardTopProduct = {
	productId: string
	name: string
	slug: string
	totalSold: number
	totalRevenue: number
}

export type DashboardResponse = {
	summary: DashboardSummary
	orderStatus: DashboardOrderStatus[]
	recentOrders: DashboardRecentOrder[]
	recentCustomers: DashboardRecentCustomer[]
	recentReviews: DashboardRecentReview[]
	topProducts: DashboardTopProduct[]
}

