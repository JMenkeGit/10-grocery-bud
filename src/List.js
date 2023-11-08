import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
const List = ({ list, deleteItem, editItem, clearItems }) => {
  return (
    <section className='grocery-container'>
      {list.map(({ name, id }) => {
        return (
          <article key={id} className='grocery-item'>
            <p className='title'>{name}</p>
            <div className='btn-container'>
              <button className='edit-btn' onClick={() => editItem(id)}>
                <FaEdit />
              </button>
              <button className='delete-btn' onClick={() => deleteItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        )
      })}
      <button className='clear-btn' onClick={clearItems}>
        clear items
      </button>
    </section>
  )
}

export default List
