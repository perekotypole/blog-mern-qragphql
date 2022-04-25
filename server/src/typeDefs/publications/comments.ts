import { gql } from 'apollo-server-express'

const typeDefs = gql`

  type Comment {
    _id: ID,
    user: User,
    content: String,
    createdAt: String,
  }

  extend type Query {
    comments(publicationID: String): [Comment]
  }

  extend type Mutation {
    writeComment(comment: String, publicationID: String): Comment
  }
`
export default typeDefs
