import { createZomeCall } from './holochainClient'

export const resolvers = {
  Query: {
    getNote: async (_, { address }) => 
      createZomeCall('/notes/notes/get_note')({ address })      
  },

  Mutation: {

  }
}

export default resolvers
