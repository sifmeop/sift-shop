import { makeServerClient } from '~/common/lib/graphql/apollo-server-client'
import { gql } from '~/common/lib/graphql/generated'

const GET_HOME_PRODUCTS_GQL = gql(`
	query GetHomeProducts {
		homeProducts {
			bestSelling {
				id
				slug
				name
				images
				stock
				price
				discountPercent
			}
			featured {
				id
				slug
				name
				images
				stock
				price
				discountPercent
			}
		}
	}
`)

export const getHomeProducts = async () => {
  try {
    const client = await makeServerClient()

    return await client.query({
      query: GET_HOME_PRODUCTS_GQL
    })
  } catch {
    return {
      data: undefined
    }
  }
}
