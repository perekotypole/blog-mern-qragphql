import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

// const httpLink = createHttpLink({ uri: 'http://localhost:4040/graphql', credentials: 'include' })
const httpLink = createHttpLink({ uri: 'http://89.47.166.190:4040/graphql', credentials: 'include' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

export default client;
