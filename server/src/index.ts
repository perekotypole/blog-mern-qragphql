import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server-express'
import cookieParser from 'cookie-parser'

import { PORT } from './config'

import typeDefs from './typeDefs'
import resolvers from './resolvers'

const app = express()

app.use(cors({
  origin: 'http://89.47.166.190:3000',
  // origin: 'http://localhost:3000',
  credentials: true
}))
app.use(cookieParser())
app.use(bodyParser.json())

// створення Apollo серверу
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    console.log(req.cookies);
    
    const token = req.cookies.token || '';
    const data = jwt.decode(token)
    
    return data
  },
})

app.get('/', () => {
  console.log('Apollo GraphQL Express server is ready')
})

server.applyMiddleware({ app, cors: false })

app.listen({ port: PORT }, () => {
  console.log(
    `Server is running at http://localhost:${PORT}${server.graphqlPath}`,
  )
})
