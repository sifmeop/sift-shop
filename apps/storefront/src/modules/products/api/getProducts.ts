import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'
import { GetProductsInput } from '~/common/lib/graphql/generated/graphql'

const PRODUCTS_LIST = gql(`
	query GetProducts($input: GetProductsInput!) {
		products(input: $input) {
			products {
				id
  			slug
  			name
  			description
  			price
  			compareAtPrice
  			inStock
  			isFeatured
  			thumbnail
  			images
  			filterValues
  			specifications
			}
			filters {
				id
				name
				value
				type
				options {
					id
					label
					value
				}
			}
		}
	}
`)

export const getProducts = async (input: GetProductsInput) => {
  return apolloClient.query({ query: PRODUCTS_LIST, variables: { input } })
}
