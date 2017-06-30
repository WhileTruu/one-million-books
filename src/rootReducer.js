import { combineReducers } from 'redux'
import { reducer as bookList } from './books/list'

export default combineReducers({
  bookList,
})
