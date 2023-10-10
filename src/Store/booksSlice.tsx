import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from '../Utils/axios'
import { IDataObj } from '../Types'
import { apiKey } from '../Constants'

interface FetchBooksParams {
  searchBooks: string
  sort: string
  searchIndex?: number
}

interface IInitialState {
  allBooks: IDataObj[]
  status: 'loading' | 'success' | 'error'
  error: boolean
  totalItems: number
  searchIndex: number
  searchBooks: string
  sort: string
  category: string
}

enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (newObj: FetchBooksParams, { rejectWithValue }) => {
    try {
      const { searchBooks, sort } = newObj
      const { data } = await axios.get(
        `?q=${searchBooks}&orderBy=${sort}&startIndex=0&maxResults=30&key=${apiKey}`,
      )
      return data
    } catch (error) {
      return rejectWithValue('Failed to fetch books')
    }
  },
)

export const loadMoreBooks = createAsyncThunk(
  'books/loadMoreBooks',
  async (newObj: FetchBooksParams, { rejectWithValue }) => {
    try {
      const { searchBooks, sort, searchIndex } = newObj
      const { data } = await axios.get(
        `?q=${searchBooks}&orderBy=${sort}&startIndex=${searchIndex}&maxResults=30&key=${apiKey}`,
      )
      return data
    } catch (error) {
      return rejectWithValue('Failed to load more books')
    }
  },
)

const initialState: IInitialState = {
  allBooks: [],
  status: Status.LOADING,
  error: false,
  totalItems: 0,
  searchIndex: 0,
  searchBooks: 'Star Wars',
  sort: 'relevance',
  category: 'all',
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    onChangeSearchBooks: (state, action: PayloadAction<string>) => {
      state.searchBooks = action.payload
    },
    onChangeSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload
    },
    onChangeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBooks.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(fetchBooks.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.allBooks = action.payload.items
      state.totalItems = action.payload.totalItems
    })
    builder.addCase(fetchBooks.rejected, (state) => {
      state.status = Status.ERROR
      state.error = true
    })
    builder.addCase(loadMoreBooks.pending, (state) => {
      state.status = 'loading'
    })
    builder.addCase(loadMoreBooks.fulfilled, (state, action) => {
      state.status = Status.SUCCESS
      state.allBooks = [...state.allBooks, ...action.payload.items]
    })
    builder.addCase(loadMoreBooks.rejected, (state) => {
      state.status = Status.ERROR
      state.error = true
    })
  },
})

export const {
  onChangeSearchBooks,
  onChangeSort,
  onChangeCategory,
} = booksSlice.actions

export default booksSlice.reducer
