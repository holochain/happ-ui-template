import { createZomeCall } from './holochainClient'
import { omitBy, isUndefined } from 'lodash/fp'

function dnaToUiNote (noteResult) {
  return {
    ...noteResult,
    createdAt: noteResult.created_at
  }
}

function uiToDnaNote (noteInput) {
  return omitBy(isUndefined, {
    ...noteInput,
    created_at: noteInput.createdAt
  })
}

export const resolvers = {
  Query: {
    getNote: async (_, { address }) => 
      dnaToUiNote(await createZomeCall('/notes/notes/get_note')({ address })),
    
    listNotes: async () =>
      (await createZomeCall('/notes/notes/list_notes')()).map(dnaToUiNote),
  },

  Mutation: {
    createNote: async (_, { input }) => 
      dnaToUiNote(await createZomeCall('/notes/notes/create_note')({ note_spec: uiToDnaNote(input) })),
  
    updateNote: async (_, { address, input }) =>
      dnaToUiNote(await createZomeCall('/notes/notes/update_note')({ address, note_spec: uiToDnaNote(input) })),

    removeNote: async (_, { address }) => 
      dnaToUiNote(await createZomeCall('/notes/notes/remove_note')({ address }))
  }
}

export default resolvers
