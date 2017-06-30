const mockFetch = jest.genMockFromModule('whatwg-fetch')
jest.mock('whatwg-fetch', () => mockFetch)

const api = require('./api')

describe('api', () => {
  let realFetch
  let mockFetch

  const books = [
    {
      name : 'Tomatoes',
      author: 'Apple Banana',
      genre: 'Horror',
      publishDate: '01/02/03',
    },
    {
      name : 'Cabbages',
      author: 'Ananab Elppa',
      genre: 'Finance',
      publishDate: '03/02/01',
    },
  ]

  beforeEach(() => {
    realFetch = global.window.fetch
    mockFetch = jest.fn()
    global.window.fetch = mockFetch
  })

  afterEach(() => {
    global.window.fetch = realFetch
  })

  it('asks for the correct volume of books', () => {
    const booksVolumeNumber = '123'

    mockFetch.mockReturnValueOnce(Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(),
    }))
    expect(mockFetch).not.toHaveBeenCalled()

    return api.getBooks(booksVolumeNumber)
      .then(() => {
        expect(mockFetch).toHaveBeenCalledTimes(1)
        expect(mockFetch).toHaveBeenCalledWith(
          `${process.env.PUBLIC_URL}/books/books-volume-${booksVolumeNumber}.json`,
          { headers: { 'Content-Type': 'application/json' }, method: 'GET' },
        )
      })
  })

  it('returns the volume of books', () => {
    mockFetch.mockReturnValueOnce(Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(books),
    }))
    expect(mockFetch).not.toHaveBeenCalled()

    return api.getBooks()
      .then((result) => {
        expect(result).toBe(books)
        expect(mockFetch).toHaveBeenCalledTimes(1)
      })
  })
})
