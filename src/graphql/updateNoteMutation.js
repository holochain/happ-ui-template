import gql from 'graphql-tag'

export default gql`
  mutation UpdateNote($address: String, $input: NoteInput) {
    updateNote {
      id
      address
      createdAt
      title
      content
    }
  }
`
