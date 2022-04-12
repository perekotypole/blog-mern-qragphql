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
  }

  input UserInput {
    username: String,
    role: Roles,
    email: String,
    password: String,
    image: String,
    bio: String,
    paymant: String,
    contact: String,
  }

  extend type Query {
    findUser(id: String): User
  }
  extend type Mutation {
    createUser(user: UserInput): User
  }
`
export default typeDefs
