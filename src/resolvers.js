import { createZomeCall } from './holochainClient'
import { omitBy, isUndefined } from 'lodash/fp'

function dnaToUiNote (noteResult) {
  return {
    ...noteResult,
    createdAt: noteResult.created_at
  }
}

function uiToDnaNote (noteInput) {

  console.log('noteInput', noteInput)

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
    createNote: async (_, { noteInput }) => 
      dnaToUiNote(await createZomeCall('/notes/notes/create_note')({ note_spec: uiToDnaNote(noteInput) })),
  
    updateNote: async (_, { address, noteInput }) =>
      dnaToUiNote(await createZomeCall('/notes/notes/update_note')({ note: {...uiToDnaNote(noteInput), address} })),

    removeNote: async (_, { address }) => 
      dnaToUiNote(await createZomeCall('/notes/notes/remove_note')({ address }))
  }
}

export default resolvers
