import { useQuery } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { QUERIES } from '~/common/constants/quries'
import type { Review } from '../types/review.types'

const getReviews = async (productId: string) => {
	const { data } = await api.get<Review[]>('/reviews', {
		params: { productId }
	})
	return data
}

export const useGetReviewsQuery = (productId: string | null) => {
	return useQuery({
		queryKey: QUERIES.GET_REVIEWS(productId ?? ''),
		queryFn: () => getReviews(productId!)
	})
}
