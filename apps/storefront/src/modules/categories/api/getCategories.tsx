import { apolloClient } from '~/common/lib/graphql/apollo-client'
import { gql } from '~/common/lib/graphql/generated'
import { GetCategoriesQuery } from '~/common/lib/graphql/generated/graphql'

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
  try {
    return await apolloClient.query<GetCategoriesQuery>({
      query: CATEGORIES_LIST
    })
  } catch {
    return {
      data: undefined
    }
  }
}
