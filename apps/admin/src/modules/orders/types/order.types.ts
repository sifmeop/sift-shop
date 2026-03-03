export type OrderStatus = 'PENDING' | 'PAID' | 'PROCESSING' | 'CANCELLED'
export type PaymentMethod = 'CASH' | 'CARD'

export interface OrderItem {
	id: string
	orderId: string
	productId: string
	quantity: number
	productName: string
	price: string
	totalPrice: string
}

export interface Order {
	id: string
	number: number
	paymentId: string
	status: OrderStatus
	method: PaymentMethod
	firstName: string
	lastName: string
	email: string
	phone: string
	country: string
	city: string
	state: string | null
	address: string
	zipCode: string
	subtotalAmount: string
	discountAmount: string
	taxAmount: string
	deliveryAmount: string
	totalAmount: string
	currency: string
	userId: string
	items: OrderItem[]
	updatedAt: string
	createdAt: string
}

