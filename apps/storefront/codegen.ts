import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `http://localhost:5000/graphql`,
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/common/lib/graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql'
      }
    }
  }
}

export default config
