import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { RootState } from '../../store'

interface Contact {
  id: number,
  name: string,
  mail: string
}

interface ContactsState {
  data: Contact[],
  status: 'initial' | 'pending' | 'fulfilled' | 'rejected'
}

const initialState: ContactsState = {
  data: [],
  status: 'initial'
}

const slice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers (builder) {
    builder
    .addCase(getContacts.pending, (state, action) => {
      state.status = 'pending'
    })
    .addCase(getContacts.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.data = action.payload
    })
    .addCase(getContacts.rejected, (state, action) => {
      state.status = 'rejected'
    })

    .addCase(deleteContact.fulfilled, (state, action) => {
      state.data = state.data.filter(({id}) => id !== action.payload.id)
    })

    .addCase(addContact.fulfilled, (state, action) => {
      state.data.push(action.payload)
    })

    .addCase(editContact.fulfilled, (state, action) => {
      const index = state.data.findIndex(({id}) => id === action.payload.id)
      if (index >= 0)
        state.data[index] = action.payload
    })

  }
})

export const getContacts = createAsyncThunk('contacts/getContacts', async () => {
  const reply = await axios.get('/api/contacts')
  return reply.data
})

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id: number) => {
  const reply = await axios.delete(`/api/contacts/${id}`)
  return {id}
})

export const addContact = createAsyncThunk('contacts/addContact', async (data: Omit<Contact, 'id'>) => {
  const reply = await axios.post('/api/contacts', data)
  return reply.data
})

export const editContact = createAsyncThunk('contacts/editContact', async ({id, ...data}: Contact) => {
  const reply = await axios.put(`/api/contacts/${id}`, data)
  return reply.data
})

export default slice.reducer
