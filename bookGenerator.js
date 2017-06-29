/* REQUIRES babel-node to run or to be transpiled to es5 with babel-cli */

var mkdirp = require('mkdirp')
const fs = require('fs')
const constants = require('./bookGeneratorConstants')

var getDirName = require('path').dirname

function writeFile(path, contents, callback) {
  mkdirp(getDirName(path), function (error) {
    if (error) return callback(err)

    fs.writeFile(path, contents, 'utf-8', callback)
  })
}

const generateRandomWordsFromList = (list, amount = 0) => (
  list.sort(() => 0.5 - Math.random()).slice(0, 1 + number).join(' ')
)

const sortByName = (a, b) => {
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1
  return 0
}

function generateBooks(amount) {
  const books = []
  const dates = [(new Date()).toLocaleDateString(), '31/10/2014', '30/06/17', '24/02/17']

  for (let i = 0; i < amount; i += 1) {
    const bookName = generateRandomWordsFromList(constants.nouns, Math.random() * 4)

    books.push({
      name: `${bookName.slice(0, 1).toUpperCase()}${bookName.slice(1)}`,
      authorId: Math.floor(Math.random() * constants.names.length),
      genreId: Math.floor(Math.random() * constants.genres.length),
      publishDate: generateRandomWordsFromList(dates),
    })
  }
  return Promise.resolve(books.sort(sortByName))
}

function generateAuthors() {
  const authors = {}
  const genders = ['apache', 'male', 'female']

  for (let i = 0; i < constants.names.length; i += 1) {
    authors[i] = {
      name: constants.names[i],
      gender: generateRandomWordsFromList(genders),
    }
  }
  return Promise.resolve(authors)
}

function generateGenres() {
  const genres = {}

  for (let i = 0; i < constants.genres.length; i += 1) {
    genres[i] = constants.genres[i]
  }
  return Promise.resolve(genres)
}

function generateBooksAndWriteToFile(numberOfBooks) {
  generateBooks(numberOfBooks).then(books => {
    for (let i = 0; i < 1000; i += 1) {
      writeFile(`public/books/books-volume-${i}.json`, JSON.stringify(books.splice(0, 1000)), (val) => val)
    }
  })
}

function generateAuthorsAndWriteToFile() {
  generateAuthors().then(authors => {
    console.log(authors)
    writeFile(`src/books/authors.json`, JSON.stringify(authors), (val) => val)
  })
}

function generateGenresAndWriteToFile() {
  generateGenres().then(genres => {
    writeFile(`src/books/genres.json`, JSON.stringify(genres), (val) => val)
  })
}

generateBooksAndWriteToFile(1000000)
generateAuthorsAndWriteToFile()
generateGenresAndWriteToFile()
