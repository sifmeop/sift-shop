import { createFileRoute } from '@tanstack/react-router'
import { CustomersPage } from '~/pages/customers'

export const Route = createFileRoute('/_auth/customers')({
	component: CustomersPage
})
