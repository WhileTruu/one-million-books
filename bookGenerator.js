var mkdirp = require('mkdirp');
const fs = require('fs')
const constants = require('./bookGeneratorConstants')

var getDirName = require('path').dirname;

function writeFile(path, contents, callback) {
  mkdirp(getDirName(path), function (err) {
    if (err) return callback(err);

    fs.writeFile(path, contents, 'utf-8', callback);
  });
}


const generateWords = (list, number = 0) => (
  list.sort(() => 0.5 - Math.random()).slice(0, 1 + number).join(' ')
)

const sortByName = (a, b) => {
  if (a.name < b.name) {
    return -1
  }
  if (a.name > b.name) {
    return 1
  }
  return 0
}

function generateBooks(amount) {
  const books = []
  const dates = [(new Date()).toLocaleDateString(), '31/10/2014', '30/06/17', '24/02/17']

  for (let i = 0; i < amount; i += 1) {
    const bookName = generateWords(constants.nouns, Math.random() * 4)

    books.push({
      name: `${bookName.slice(0, 1).toUpperCase()}${bookName.slice(1)}`,
      author: generateWords(constants.names),
      genre: generateWords(constants.genres),
      publishDate: generateWords(dates),
    })
  }
  return Promise.resolve(books.sort(sortByName))
}

// generateBooks(1000000).then(books => {
//   for (let i = 0; i < 1000; i += 1) {
//     writeFile(`public/books/books-volume-${i}.json`, JSON.stringify(books.splice(0, 1000)), (val) => val);
//   }
// })

function generateAuthors(amount) {
  const authors = []
  const genders = ['apache', 'male', 'female']

  for (let i = 0; i < constants.names.length; i += 1) {
    authors.push({
      name: constants.names[i],
      gender: generateWords(genders),
    })
  }
  return Promise.resolve(authors.sort(sortByName))
}

generateAuthors().then(authors => {
  console.log(authors)
  writeFile(`public/authors/authors.json`, JSON.stringify(authors), (val) => val);
})
