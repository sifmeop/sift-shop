import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'
import {
  GetProductsInput,
  GetProductsQuery
} from '~/common/lib/graphql/generated/graphql'

const PRODUCTS_LIST = gql(`
	query GetProducts($input: GetProductsInput!, $filters: JSON) {
		products(input: $input, filters: $filters) {
			products {
				id
  			slug
  			name
  			description
  			price
  			discountPercent
  			stock
  			isFeatured
  			images
  			specifications
			}
			filters {
				id
				name
				slug
				options {
					id
					label
					value
				}
			}
		}
	}
`)

export const getProducts = async (
  input: GetProductsInput,
  filters?: Record<string, string>
) => {
  return apolloClient.query<GetProductsQuery>({
    query: PRODUCTS_LIST,
    variables: { input, filters }
  })
}
