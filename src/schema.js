import gql from "graphql-tag"

export default gql`

type Note {
  id: ID  
  address: String
  createdAt: String
  subject: String
  content: String
}

input NoteInput {
  createdAt: String
  subject: String
  content: String
}

type Query {
  getNote(address: String): Note
  listNotes: [Note]
}

type Mutation {
  createNote(input: NoteInput): Note
  updateNote(address: String, input: NoteInput): Note
  removeNote(address: String): Note
}

`
