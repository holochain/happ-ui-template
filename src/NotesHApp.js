import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import LIST_NOTES_QUERY from './graphql/listNotesQuery'
import CREATE_NOTE_MUTATION from './graphql/createNoteMutation'
import UPDATE_NOTE_MUTATION from './graphql/updateNoteMutation'
import REMOVE_NOTE_MUTATION from './graphql/removeNoteMutation'

import './NotesHApp.css'

function NotesHApp() {
  const { data: { listNotes } = { listNotes: [] } } = useQuery(LIST_NOTES_QUERY)
  const [createNote] = useMutation(CREATE_NOTE_MUTATION)
  const [updateNote] = useMutation(UPDATE_NOTE_MUTATION)
  const [removeNote] = useMutation(REMOVE_NOTE_MUTATION)
  
  // the id of the note currently being edited
  const [editingNoteId, setEditingNoteId] = useState()

  return <div className='notes-happ'>
    <h1>Notes hApp</h1>

    <NoteForm 
      formAction={noteInput => createNote({ variables: { noteInput }})}
      formTitle='Create Note' />

    <div className='note-list'>
      {listNotes.map(note =>
        <NoteRow 
          key={note.id}
          note={note}
          editingNoteId={editingNoteId}
          setEditingNoteId={setEditingNoteId}
          removeNote={removeNote}
          updateNote={updateNote} />)}
    </div>
  </div>
}

function NoteRow({ note, editingNoteId, setEditingNoteId, updateNote, removeNote }) {
  const { id } = note
  
  if (id === editingNoteId) {
    return <NoteForm 
      note={note} 
      formTitle='Update Note' 
      setEditingNoteId={setEditingNoteId} 
      formAction={noteInput => updateNote({ variables: { noteInput } })} />
  }

  return <NoteCard note={note} setEditingNoteId={setEditingNoteId} removeNote={removeNote} />
}

function NoteCard({ note: { id, address, title, content }, setEditingNoteId, removeNote }) {

  return <div className='note-card'>
    <h3>{title}</h3>
    <div>{content}</div>
    <button onClick={() => setEditingNoteId(id)}>Edit</button>
    <button onClick={() => removeNote({ variables: { address } })}>Remove</button>    
  </div>
}

function NoteForm({ note = { title: '', content: ''}, formTitle, formAction, setEditingNoteId = () => {} }) {

  const [formState, setFormState] = useState(note)
  const { title, content } = formState

  const setField = field => ({ target: { value } }) => setFormState(formState => ({
    ...formState,
    [field]: value
  }))

  const onSubmit = () => {
    formAction({
      ...formState,
      createdAt: Date.now().toString()
    })
    setEditingNoteId(null)
  }

  return <div className='note-form'>
    <h3>{formTitle}</h3>
    <div>
      <label htmlFor='title'>Title</label>
      <input id='title' name='title' value={title} onChange={setField('title')} />
    </div>
    <div>
      <label htmlFor='content'>Content</label>
      <textarea id='content' name='content' value={content} onChange={setField('content')} />
    </div>
    <div>
      <button onClick={onSubmit}>Submit</button>
      <button onClick={() => setEditingNoteId(null)}>Cancel</button>
    </div>
  </div>
}

export default NotesHApp

