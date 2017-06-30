import React from 'react'
import logo from './logo.svg'
import BookList from './books/list'

export default () => (
  <div className="App container text-center py-3 d-flex flex-column" style={{ minHeight: '100vh' }}>
    <div className="App-header">
      <h1>One Million Books!</h1>
    </div>
    <BookList />
  </div>
)
