import { ApolloProvider } from "@apollo/client"
import client from "../apollo-client"

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Component {...pageProps} />
  </ApolloProvider>
)

export default MyApp