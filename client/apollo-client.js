import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    // uri: "https://countries.trevorblades.com",
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
});

export default client;