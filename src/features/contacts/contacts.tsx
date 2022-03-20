import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { getContacts, deleteContact, addContact, editContact } from './contactsSlice'
import styles from './contacts.css'

export default () => {
  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.contacts.status)
  const contacts = useAppSelector(state => state.contacts.data)
  const [editedId, setEditedId] = useState(NaN)
  const [editedName, setEditedName] = useState('')
  const [editedMail, setEditedMail] = useState('')
  const [newName, setNewName] = useState('')
  const [newMail, setNewMail] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (status === 'initial')
      dispatch(getContacts())
  }, [dispatch, status])

  const onEditName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedName(event.target.value)

  const onEditMail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEditedMail(event.target.value)

  const onEditNewName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewName(event.target.value)

  const onEditNewMail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setNewMail(event.target.value)

  function reset () {
    setEditedId(NaN)
    setEditedName('')
    setEditedMail('')
    setNewName('')
    setNewMail('')
  }

  function save () {
    if (!editedName || !editedMail)
      return
  
    dispatch(editContact({
      id: editedId,
      name: editedName,
      mail: editedMail
    }))
    reset()
  }

  function add () {
    if (!newName || !newMail)
      return;
  
    dispatch(addContact({
      name: newName,
      mail: newMail
    }))
    reset()
  }

  function onEnter (event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter')
      save()
  }

  function remove (id: number) {
    dispatch(deleteContact(id))
    reset()
  }

  function updateSearch (event: React.ChangeEvent<HTMLInputElement>) {
    setFilter(event.target.value)
  }

  const filteredContacts = contacts.filter(item =>
       item.name.toLowerCase().includes(filter.toLowerCase())
    || item.mail.toLowerCase().includes(filter.toLowerCase()))

  return <>
    <ol className={styles.contacts}>
      <li><input className={styles.search} value={filter} onChange={updateSearch} placeholder="Search" /></li>
      {filteredContacts.map(({id, name, mail}) => {
        if (editedId === id)
          return <li className={styles.entry} key={id}>
            <button className={styles.control} onClick={save}>Save</button>
            <button className={styles.control} onClick={() => remove(id)}>Delete</button>
            <input className={styles.editable} onChange={onEditName} onKeyPress={onEnter} value={editedName} />
            <input className={styles.editable} onChange={onEditMail} onKeyPress={onEnter} value={editedMail} />
          </li>
        else
          return <li className={styles.entry} key={id}>
            <button onClick={() => {
                reset();
                setEditedId(id);
                setEditedName(name);
                setEditedMail(mail);
              }} className={styles.control}>Edit</button>
            <button onClick={() => remove(id)} className={styles.control}>Delete</button>
            <div className={styles.editable}>{name}</div>
            <div className={styles.editable}>{mail}</div>
          </li>
      })}
      <li className={styles.entry}>
        <button className={styles.control} onClick={add}>Add</button>
        <input className={styles.editable} onChange={onEditNewName} onKeyPress={onEnter} value={newName} />
        <input className={styles.editable} onChange={onEditNewMail} onKeyPress={onEnter} value={newMail} />
      </li>
    </ol>
  </>
}
