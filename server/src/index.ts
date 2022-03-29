import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import { PORT } from './config'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', () => {
  console.log('Apollo GraphQL Express server is ready')
})

server.applyMiddleware({ app })

app.listen({ port: PORT }, () => {
  console.log(
    `Server is running at http://localhost:${PORT}${server.graphqlPath}`,
  )
})
