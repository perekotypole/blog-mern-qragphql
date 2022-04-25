import { gql } from 'apollo-server-express'

const typeDefs = gql`
  type Token {
    token: String,
  }

  input LoginInput {
    username: String,
    password: String,
  }

  input UserInput {
    username: String,
    email: String,
    password: String,
  }

  extend type Query {
    login(data: LoginInput): Token
    role: String
  }

  extend type Mutation {
    registerUser(user: UserInput): Token
  }
`
export default typeDefs
