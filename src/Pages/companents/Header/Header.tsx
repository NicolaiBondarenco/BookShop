import React from 'react'
import { useDispatch } from 'react-redux'
import {
  onChangeCategory,
  onChangeSearchBooks,
  onChangeSort,
} from '../../../Store/booksSlice'
import { Select } from '../../../ui/Select/Select'
import { Search } from '../../../ui/Search/Search'
import { categoryArr, sortArr } from '../../../Constants'
import './Header.scss'

export const Header: React.FC = () => {
  const dispatch = useDispatch()

  const onHandleCategory = (value: string) => {
    dispatch(onChangeCategory(value))
  }
  const onHandleSort = (value: string) => {
    dispatch(onChangeSort(value))
  }
  const handleServerBook = (value: any): void => {
    if (value === '') return
    dispatch(onChangeSearchBooks(value))
  }

  return (
    <div className="header">
      <h1>Search for books</h1>
      <Search onClick={handleServerBook} />
      <div className="header__inner">
        <div>
          <label>Sort</label>
          <Select
            data={categoryArr}
            title={'Categories'}
            idHtml={'cat-select'}
            onChangeValue={onHandleCategory}
          />
        </div>
        <div>
          <label>Filter</label>
          <Select
            data={sortArr}
            title={'Sorting by'}
            idHtml={'sort-select'}
            onChangeValue={onHandleSort}
          />
        </div>
      </div>
    </div>
  )
}
