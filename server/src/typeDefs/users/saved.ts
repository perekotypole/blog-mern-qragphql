import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Query {
    saved: [ShortPublication]
  }
  extend type Mutation {
    toggleSaved(publicationID: String): Boolean
  }
`
export default typeDefs
