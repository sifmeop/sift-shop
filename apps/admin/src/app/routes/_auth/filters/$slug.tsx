import { createFileRoute } from '@tanstack/react-router'
import { FiltersPage } from '~/pages/filters'

export const Route = createFileRoute('/_auth/filters/$slug')({
	component: FiltersPage
})
