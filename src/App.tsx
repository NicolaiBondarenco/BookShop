import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { DetailsBook } from './Pages/DetailsBook/DetailsBook'
import { Header } from './Pages/companents/Header/Header'
import { ItemList } from './Pages/BooksList/ItemList'

export const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/detailsBook/:id" element={<DetailsBook />} />
      </Routes>
    </div>
  )
}
