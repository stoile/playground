import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"

const client = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:3000/graphql", fetch }),
  cache: new InMemoryCache()
})

import gql from "graphql-tag"

client.query({
  query: gql`
    query {
      author(firstName:"Edmond", lastName: "Jones"){
        firstName
        lastName
        posts{
          title
          views
        }
      }
    }
  `,
})
  .then(data => console.log(data))
  .catch(error => console.error(error))
