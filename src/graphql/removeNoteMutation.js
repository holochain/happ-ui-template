import gql from 'graphql-tag'

export default gql`
  mutation RemoveNote($address: String) {
    removeNote {
      id
      address
      createdAt
      title
      content
    }
  }
`
