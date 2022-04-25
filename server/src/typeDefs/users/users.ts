import { gql } from 'apollo-server-express'

const typeDefs = gql`
  enum Roles {
    admin,
    moderator,
    user,
  }

  type User {
    _id: ID,
    username: String,
    role: Roles,
    email: String,
    password: String,
    image: String,
    bio: String,
    paymant: String,
    contact: String,
    createdAt: String,
  }

  extend type Query {
    ownProfile: User
    username: String
  }
`
export default typeDefs
