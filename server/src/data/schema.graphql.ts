import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Example {
    id: ID
  }

  input ExampleInput {
    id: ID
  }

  type Query {
    getExample: [Example]
  }

  type Mutation {
    addExample(example: ExampleInput): Example
  }
`
