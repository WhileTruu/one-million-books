import { ADD_BOOKS } from './constants'

import { getBooks as getBooksFromApi } from '../../common/api.js'

export function getBooks({ startIndex, stopIndex }) {
  return (dispatch, getState) => {
    const { books } = getState().bookList

    for (let i = Math.floor(startIndex / 1000); i <= Math.floor(stopIndex / 1000); i++) {
      getBooksFromApi(i).then(newBooks => {
        dispatch({
          type: ADD_BOOKS,
          rowCount: 1000 + i * 1000,
          books: {
            ...books,
            ...newBooks.reduce((pBook, nBook, index) => (
              { ...pBook, [index + i * 1000]: nBook }
            ), null)
          },
        })
      })
      .catch(console.error)
    }
  }
}
