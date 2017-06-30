import { ADD_BOOKS, ADD_AUTHORS } from './constants'

const initialState = {
  reversed: false,
  books: null,
  rowCount: 1000,
}

export default function bookList(state = initialState, action) {
  switch(action.type) {
    case ADD_BOOKS: {
      return {
        ...state,
        books: action.books,
        rowCount: action.rowCount,
      }
    }
    default:
      return state
  }
}
