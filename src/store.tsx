import { configureStore } from '@reduxjs/toolkit'
import contacts from './features/contacts/contactsSlice'

const store = configureStore({
  reducer: {
    contacts
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
