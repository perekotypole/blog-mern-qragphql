import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Topic {
    _id: ID,
    title: String,
  }
`
export default typeDefs
