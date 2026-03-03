export interface AccountDetails {
	id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	city: string
	country: string
	state: string | null
	address: string
	zipCode: string
	userId: string
}

export interface Customer {
	id: string
	email: string
	fullName: string
	avatar: string | null
	isVerified: boolean
	isTwoFactorEnabled: boolean
	createdAt: string
	accountDetails: AccountDetails | null
}

