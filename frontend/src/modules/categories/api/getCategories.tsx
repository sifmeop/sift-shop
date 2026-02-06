import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'

const CATEGORIES_LIST = gql(`
  query GetCategories {
    categories {
      slug
      name
      subcategories {
        slug
        name
        image
      }
    }
  }
`)

export const getCategories = async () => {
  return apolloClient.query({ query: CATEGORIES_LIST })
}
