const { gql } = require('apollo-server-express')

export default gql`
  type Error {
    error: String
  }
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`
