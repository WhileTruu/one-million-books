import 'whatwg-fetch'

function transformResponse(response) {
  if (response.ok && response.status < 400) return response.json()
  else if (response.status >= 400) {
    const error = { status: response.status }
    throw error
  }
  throw response
}

const headers = {
  'Content-Type': 'application/json',
}

export function getBooks(number = 0) {
  return fetch(`${process.env.PUBLIC_URL}/books/books-volume-${number}.json`, {
    method: 'GET',
    headers,
  }).then(transformResponse)
}
