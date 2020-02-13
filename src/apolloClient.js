import { ApolloClient } from 'apollo-client'
import { SchemaLink } from 'apollo-link-schema'
import { makeExecutableSchema } from 'graphql-tools'
import apolloLogger from 'apollo-link-logger'
import { ApolloLink } from 'apollo-link'

import { InMemoryCache } from 'apollo-cache-inmemory'

import typeDefs from './schema'
import resolvers from './resolvers'

const schemaLink = new SchemaLink({ schema: makeExecutableSchema({ typeDefs, resolvers }) })

const link = ApolloLink.from([
  schemaLink,
  apolloLogger
])

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

export default apolloClient