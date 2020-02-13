// data is a tree organized by instanceId > zome > function
// leaves can either be an object, or a function which is called with the zome call args.
// DON'T use this function to update the tree, just to construct return values.
// See mockCallZome.js

const noteEntries = {
  'QmRccTDUM1UcJWuxW3aMjfYkSBFmhBnGtgB7lAddress01': {
    id: '1',
    created_at: '1581553349996',
    title: 'Note 1',
    content: 'The body of note 1'
  },
  'QmRccTDUM1UcJWuxW3aMjfYkSBFmhBnGtgB7lAddress02': {
    id: '2',
    created_at: '1581553400796',
    title: 'Note 2',
    content: 'The body of note 2'
  },
  'QmRccTDUM1UcJWuxW3aMjfYkSBFmhBnGtgB7lAddress03': {
    id: '3',
    created_at: '1581553434263',
    title: 'Note 3',
    content: 'The body of note 3'
  }
}

const data = {
  notes: {
    notes: {
      create_note: ({ note_spec }) => {
        const id = 1
        const address = 'QmRccTDUM1UcJWuxW3aMjfYkSBFmhBnGtgB7lAddress00'
        return {
          id,
          address,
          ...note_spec
        }
      },

      get_note: ({ address }) => {
        const noteEntry = noteEntries[address]
        if (!noteEntry) throw new Error(`Can't find note with address`, address)
        return {
          address,
          ...noteEntry
        }
      },

      update_note: ({ address, note_spec }) => {
        const noteResult = data.notes.notes.get_note({ address })

        return {
          ...noteResult,
          ...note_spec
        }
      },

      remove_note: ({ address }) => data.notes.notes.get_note({ address }),

      list_notes: () => Object.keys(noteEntries).map(key => ({
        address: key,
        ...noteEntries[key]
      }))
    }
  }
}

export default data