import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import type { ProductFilter } from '../types/product.types'

const getFilters = async (slug: string) => {
	const { data } = await api.get<ProductFilter[]>(`/filters/${slug}`)
	return data
}

export const useGetSubcategoryFiltersQuery = (slug: string | null) => {
	return useQuery({
		queryKey: ['get-product-form-filters', slug ?? ''],
		queryFn: () => getFilters(slug!),
		enabled: Boolean(slug)
	})
}

