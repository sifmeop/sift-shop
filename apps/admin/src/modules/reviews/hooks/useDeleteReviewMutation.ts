import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '~/common/api/axiosInstance'
import { MUTATIONS } from '~/common/constants/mutations'
import { QUERIES } from '~/common/constants/quries'
import type { Review } from '../types/review.types'

const deleteReview = async (id: string) => {
	const { data } = await api.delete<Review>(`/reviews/${id}`)
	return data
}

export const useDeleteReviewMutation = (id: string, productId: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: MUTATIONS.DELETE_REVIEW(id),
		mutationFn: () => deleteReview(id),
		onMutate: async () => {
			await queryClient.cancelQueries({
				queryKey: QUERIES.GET_REVIEWS(productId)
			})

			const previousReviews = queryClient.getQueryData<Review[]>(
				QUERIES.GET_REVIEWS(productId)
			)

			queryClient.setQueryData<Review[]>(QUERIES.GET_REVIEWS(productId), (rows = []) =>
				rows.filter((row) => row.id !== id)
			)

			return { previousReviews }
		},
		onError: (_error, _variables, context) => {
			if (context?.previousReviews) {
				queryClient.setQueryData(
					QUERIES.GET_REVIEWS(productId),
					context.previousReviews
				)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({
				queryKey: QUERIES.GET_REVIEWS(productId)
			})
		}
	})
}

