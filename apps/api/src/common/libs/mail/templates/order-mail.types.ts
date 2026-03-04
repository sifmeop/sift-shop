export interface OrderMailItem {
  productName: string
  quantity: number
  unitPrice: number | string
  totalPrice: number | string
}

export interface OrderMailData {
  orderNumber: number
  paymentId: string
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  city: string
  state?: string | null
  address: string
  zipCode: string
  currency: string
  subtotalAmount: number | string
  discountAmount: number | string
  taxAmount: number | string
  deliveryAmount: number | string
  totalAmount: number | string
  items: OrderMailItem[]
}
