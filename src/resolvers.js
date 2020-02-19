import { createZomeCall } from './holochainClient'

function dnaToUiNote (noteResult) {
  console.log('noteResult : ', noteResult)
  return {
    ...noteResult,
    createdAt: noteResult.created_at
  }
}

export const resolvers = {
  Query: {
    getNote: async (_, { id }) =>
      dnaToUiNote(await createZomeCall('/notes/notes/get_note')({ id })),

    listNotes: async () =>
      (await createZomeCall('/notes/notes/list_notes')()).map(dnaToUiNote)
  },

  Mutation: {
    createNote: async (_, { noteInput }) => dnaToUiNote(await createZomeCall('/notes/notes/create_note')({ note_input: noteInput })),

    updateNote: async (_, { id, noteInput }) => {
      console.log('noteInput : ', noteInput)
      console.log('id : ', id)
      dnaToUiNote(await createZomeCall('/notes/notes/update_note')({ id, note_input: noteInput }))
    },

    removeNote: async (_, { id }) =>
      dnaToUiNote(await createZomeCall('/notes/notes/remove_note')({ id }))
  }
}

export default resolvers
