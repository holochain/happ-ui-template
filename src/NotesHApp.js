import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import LIST_NOTES_QUERY from './graphql/listNotesQuery'
import './NotesHApp.css'

function NotesHApp() {
  const { data: { listNotes } = { listNotes: [] } } = useQuery(LIST_NOTES_QUERY)

  return <div className='notes-happ'>
    <h1>Notes hApp</h1>
    <div className='note-list'>
      {listNotes.map(note => 
        <NoteRow note={note} key={note.id} />)}
    </div>
  </div>
}

function NoteRow({ note: { title, content } }) {
  return <div className='note-row'>
    <h3>{title}</h3>
    <div>{content}</div>
  </div>
}

export default NotesHApp

