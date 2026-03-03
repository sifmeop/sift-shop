import { createFileRoute } from '@tanstack/react-router'
import { FiltersPage } from '~/pages/filters'

export const Route = createFileRoute('/_auth/filters/$slug')({
	component: FiltersRouteComponent
})

function FiltersRouteComponent() {
	const { slug } = Route.useParams()
	return <FiltersPage initialSubcategorySlug={slug} />
}
