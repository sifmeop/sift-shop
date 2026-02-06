import { gql } from '@apollo/client'

import { apolloClient } from '~/common/lib/apollo-client'

const CATEGORIES_LIST = gql`
  query {
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
`

export const getCategories = async () => {
  return apolloClient.query({ query: CATEGORIES_LIST })
}
