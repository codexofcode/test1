import React from 'react'
import { render } from 'react-dom'
import Contacts from './features/contacts/contacts'
import store from './store'
import { Provider } from 'react-redux'

document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div')
  document.body.appendChild(root)
  render(
  <Provider store={store}>
    <Contacts />
  </Provider>, root)
})
