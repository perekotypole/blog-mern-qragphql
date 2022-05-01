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
    profile (username: String): User
    profiles: [User]
    username: String
  }

  extend type Mutation {
    changeRole (user: String, role: String): Boolean 
    removeUser(id: String): Boolean,
  }
`
export default typeDefs
