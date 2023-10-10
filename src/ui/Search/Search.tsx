import React, { useState } from 'react'
import './Search.scss'

export const Search = ({onClick}:any) => {
  const [nameBooks, setNameBooks] = useState('')

  return (
    <div className="search" onClick={() => onClick(nameBooks)}>
      <input
        type="text"
        onChange={(e)=>setNameBooks(e.target.value)}
        value={nameBooks}
        placeholder="Enter"
      />
      <button>Search</button>
    </div>
  )
}
