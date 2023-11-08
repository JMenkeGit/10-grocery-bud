import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return JSON.parse(list)
  } else {
    return []
  }
}

function App() {
  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [editID, setEditID] = useState(null)
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const deleteItem = (id) => {
    showAlert(true, 'item removed', 'danger')
    const newList = list.filter((item) => item.id !== id)
    setList(newList)
  }
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.name)
  }
  const reset = () => {
    setName('')
    setEditID(null)
    setIsEditing(false)
  }
  const clearItems = () => {
    showAlert(true, 'empty list', 'danger')
    reset()
    setList('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // setAlert(false)
    if (!name) {
      // display alert
      showAlert(true, 'please enter value', 'danger')
    } else if (name && isEditing) {
      // show alert
      showAlert(true, 'item changed', 'success')
      // edit item
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, name: name }
          }
          return item
        })
      )
    } else {
      // show alert
      showAlert(true, 'item added to the list', 'success')
      // create new item
      const newItem = {
        id: new Date().getTime().toString(),
        name: name,
      }
      setList([...list, newItem])
    }
    reset()
  }

  const showAlert = (show = false, msg, type) => {
    setAlert({ show, msg, type })
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  return (
    <section className='section-center'>
      <form onSubmit={handleSubmit} className='grocery-form'>
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery bud</h3>
        <div className='form-control'>
          <input
            type='text'
            className='grocery'
            // id='grocery'
            // name='grocery'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='e.g. eggs'
          />
          <button className='submit-btn' type='submit'>
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <List
          list={list}
          deleteItem={deleteItem}
          editItem={editItem}
          clearItems={clearItems}
        />
      )}
    </section>
  )
}

export default App
