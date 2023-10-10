import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loadMoreBooks, fetchBooks } from '../../Store/booksSlice'
import { RootState, AppDispatch } from '../../Store'
import { Error } from '../../ui/Error/Error'
import { Loader } from '../../ui/Loader/Loader'
import { LoadMoreBtn } from '../../ui/LoadMoreBtn/LoadMoreBtn'

import { IDataObj } from '../../Types'

import './ItemList.scss'
import uuid from 'react-uuid'
import { BookItem } from '../companents/BookItem/BookItem'

export const ItemList: React.FC = () => {
  const {
    allBooks,
    totalItems,
    searchBooks,
    sort,
    category,
    status,
    error,
  } = useSelector((state: RootState) => state.books)
  const dispatch = useDispatch<AppDispatch>()
  const [searchIndex, setSearchIndex] = useState(0)

  const handleLoadMore = () => {
    setSearchIndex(allBooks.length + 1)
    const newObjForSearch = { searchBooks, sort, searchIndex }
    dispatch(loadMoreBooks(newObjForSearch))
  }

  const filteredItems = useMemo(() => {
    return allBooks?.filter((item: IDataObj) => {
      if (item.volumeInfo.categories !== undefined) {
        if (category === 'all') return true
        return (
          item.volumeInfo.categories[0].toLowerCase() === category.toLowerCase()
        )
      }
      return false
    })
  }, [allBooks, category])

  useEffect(() => {
    const newObjForSearch = {
      searchBooks,
      sort,
      searchIndex,
    }
    dispatch(fetchBooks(newObjForSearch))
  }, [searchBooks, sort, dispatch, searchIndex])

  if (error) return <Error />
  if (status === 'loading' && allBooks?.length === 0) return <Loader />

  return (
    <div className="itemList">
      {filteredItems?.length === 0 || typeof filteredItems === 'undefined' ? (
        <p className="itemList__count-notFound">
          No books found in this category!
        </p>
      ) : (
        <div className="itemList__count">
          <p>Found {totalItems} results</p>
        </div>
      )}
      <div className="itemList__inner">
        {filteredItems?.map((item: IDataObj) => {
          return (
            <BookItem
              key={uuid()}
              title={item?.volumeInfo?.title ?? ''}
              categories={item?.volumeInfo?.categories ?? ''}
              desc={item?.volumeInfo?.description ?? ''}
              image={item?.volumeInfo?.imageLinks?.smallThumbnail ?? ''}
              author={item?.volumeInfo?.authors ?? ''}
              id={item.id}
            />
          )
        })}
      </div>
      <div className="itemList__btn">
        {filteredItems?.length >= 1 && filteredItems?.length < totalItems ? (
          <LoadMoreBtn status={status} onClick={handleLoadMore} />
        ) : null}
      </div>
    </div>
  )
}
