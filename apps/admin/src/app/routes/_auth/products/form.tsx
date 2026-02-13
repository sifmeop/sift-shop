import { createFileRoute } from '@tanstack/react-router'
import { ProductFormPage } from '~/pages/products'

export const Route = createFileRoute('/_auth/products/form')({
	component: ProductFormPage
})
