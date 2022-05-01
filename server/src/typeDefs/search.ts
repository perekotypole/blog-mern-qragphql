import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Search {
    publications: [ShortPublication],
    users: [User],
  }
  
  extend type Query {
    search(query: String): Search
  }
`
export default typeDefs
