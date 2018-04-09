import { InMemoryCache } from "apollo-cache-inmemory"
import { ApolloClient } from "apollo-client"
import { HttpLink } from "apollo-link-http"
import fetch from "isomorphic-unfetch"

let server: string = "localhost"
if (process.argv.length >= 4 && process.argv[2] === "--server") {
    server = process.argv[3]
}

const client = new ApolloClient({
    link: new HttpLink({ uri: `http://${server}:3000/graphql`, fetch }),
    cache: new InMemoryCache()
})

import gql from "graphql-tag"

interface ResponseData {
    author: {
        firstName: string
        lastName: string
        posts: {
            title: string
        }[]
    }
    getFortuneCookie: string
}

client.query({
    query: gql`
    query {
      author(firstName: "Edmond", lastName: "Jones") {
        firstName
        lastName
        posts {
            title
        }
      }
      getFortuneCookie
    }
  `,
})
    .then(data => {
        const response: ResponseData = data.data as ResponseData
        console.log("Author: ", response.author)
        console.log("Fortune Cookie: ", response.getFortuneCookie)
    })
    .catch(error => console.error(error))
