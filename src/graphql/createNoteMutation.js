import gql from 'graphql-tag'

export default gql`
  mutation CreateNote($noteInput: NoteInput) {
    createNote {
      id
      address
      createdAt
      title
      content
    }
  }
`
