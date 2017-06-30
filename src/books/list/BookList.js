import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getBooks } from './actions'
import { MAX_NUMBER_OF_BOOKS, HORROR_GENRE_ID, FINANCE_GENRE_ID } from './constants'
import { isDateOnHalloween, isLastFridayOfTheMonth } from '../util'

import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer'
import InfiniteLoader from 'react-virtualized/dist/commonjs/InfiniteLoader'
import List from 'react-virtualized/dist/commonjs/List'

import authors from '../authors.json'
import genres from '../genres.json'

import './BookList.css'

function isRowLoaded({ index, books }) {
  return books && books[index]
}

const rowRenderer = ({ key, book, index, style }) => {
  const publishDateArray = book ? book.publishDate.split('/').map(i => parseInt(i)) : [0, 0, 2000]
  publishDateArray[2] += 2000

  const publishedOnHalloween = isDateOnHalloween(publishDateArray[0], publishDateArray[1])
  const publishedOnLastFridayOfTheMonth = (
    isLastFridayOfTheMonth(publishDateArray[0], publishDateArray[1], publishDateArray[2])
  )

  const isHorrorGenre = book && book.genreId === HORROR_GENRE_ID
  const isFinanceGenre = book && book.genreId === FINANCE_GENRE_ID

  const renderRowText = (text, placeholder) => (!book ? placeholder : text)
  return (
    <div
      key={key}
      style={style}
      className={
        [
          `${(publishedOnLastFridayOfTheMonth && isFinanceGenre) ? 'finance' : ''}`,
          `${(publishedOnHalloween && isHorrorGenre) ? 'halloween' : ''}`,
          'list-group-item',
          'omb-bordered-list-item',
          'flex-column',
          'align-items-start',
        ].join(' ')
      }
    >
      <div
        className={`d-flex w-100 justify-content-between ${!book ? 'omb-placeholder' : ''}`}
      >
        <h5 className="mb-1">
          { renderRowText(book && book.name, 'Twilight') }
        </h5>
        <small>
          { renderRowText(book && book.publishDate, '99/99/99') }
        </small>
      </div>
      <p className={`mb-1 ${!book ? 'omb-placeholder' : ''}`}>
        { renderRowText(book && authors[book.authorId].name, 'Robust Unicorn') }
      </p>
      <small className={`${!book ? 'omb-placeholder' : ''}`}>
        { renderRowText(book && genres[book.genreId], 'Self help') }
      </small>
    </div>
  )
}

function BookList({ books, getBooks, reverseList, reversed, rowCount }) {
  return (
    <div style={{ display: 'flex', flex: '1 1 auto' }}>
      <div
        className="list-group omb-bordered-list-group"
        style={{ flex: '1 1 auto' }}
      >
        <AutoSizer>
          {
            ({height, width}) => (
              <InfiniteLoader
                isRowLoaded={({ index }) => isRowLoaded({ index, books })}
                loadMoreRows={getBooks}
                treshold={500}
                rowCount={MAX_NUMBER_OF_BOOKS}
              >
                {
                  ({ onRowsRendered, registerChild }) => (
                    <List
                      ref={registerChild}
                      height={height}
                      width={width}
                      onRowsRendered={onRowsRendered}
                      rowCount={rowCount}
                      rowHeight={99}
                      rowRenderer={({ key, isScrolling, index, style }) => (
                        rowRenderer({ key, isScrolling, index, style, book: books && books[index] })
                      )}
                    />
                  )
                }
              </InfiniteLoader>
            )
        }
        </AutoSizer>
      </div>
    </div>
  )
}

const mapStoreToProps = store => ({
  books: store.bookList.books,
  rowCount: store.bookList.rowCount,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  getBooks,
}, dispatch)

export default connect(mapStoreToProps, mapDispatchToProps)(BookList)
