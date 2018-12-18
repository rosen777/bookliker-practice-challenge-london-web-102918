document.addEventListener("DOMContentLoaded", init);

const apiURL = 'http://localhost:3000/books'
const bookListEl = document.querySelector('#list')
const bookListPanelEl = document.querySelector('#list-panel')
const bookShowPanelEl = document.querySelector('#show-panel')

let state =  {
  user: {
    "id": 1,
    "username": "pouros"
  },
  books: []
}

function fetchBooks() {
  fetch(apiURL)
    .then(response => response.json())
    .then(data => {
      state.books = data
      renderBooks(data)
    })
}

function renderBooks(booksArray) {
  console.log(booksArray)
  booksArray.forEach(renderSingleBook)
}

function renderSingleBook(book) {
  const bookEl = document.createElement('el')

  //results.genres[0].name;
  // results.genres.forEach(function(genre) {
  //  console.log(genre.name);
  //  });
  // let userName = book['users'][0]['username']
  let bookUsernames = []
  let bookArr = []
  // for (let i = 0; i < book.users.length; i++) {
  //   bookArr = bookUsernames.push(book['users'][i]['username'])
  // }

  book.users.forEach (function(element) {
      bookUsernames.push(element.username)
  })

  bookEl.innerHTML = `<p id='book-title'>${book.title}</p> </p>`
  bookListPanelEl.append(bookEl)
  // const bookTitle = document.querySelector('#book-title')

  bookEl.addEventListener('mouseover', () => {
  showBook()
})

function showBook (event) {
bookShowPanelEl.innerHTML = `
  <p>${book.description}</p>
  <img src='${book.img_url}'></img>
  <p class='user-likes'>${bookUsernames.join(', ')}<br>
  <button data-id='${book.id}' class='like-btn'>Read this book</button>
`

likeBook()

}

}

const likeBook = () => {
  const readButton = document.querySelector('.like-btn')
  readButton.addEventListener('click', (e) => {
        updateBookLikes(e.target.dataset.id, state.user).then(console.log)
  })
}

const updateBookLikes = (bookId, data) => {
  let usersToUpdate;
  state.books.forEach(function(currentBook) {
    if(currentBook.id === parseInt(bookId)) {
      currentBook.users.push(data)
      usersToUpdate = currentBook.users
    }
  })
  return fetch(apiURL + `/${bookId}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({users: usersToUpdate})
  }).then(res => res.json())

}

  // send a patch request to server increasing a toy's like count
//   function addClicksToLikes(){
//   document.addEventListener('click', (e) => {
//     // conditionally render the like number
//     if (e.target.className === "like-btn") {
//       likeBook(e.target.dataset.id).then(console.log)
//     }
//   })
// }
//
// function likeBook(bookId, data) {
//   return fetch(apiURL + `/${bookId}`, {
//     method: 'PATCH',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({users.username: data})
//   }).then(res => res.json())
//
// }

// function saveNewBook(e) {
//   e.preventDefault()
//   console.log(e)

// }

function init() {
  fetchBooks()
  // addClicksToLikes()

}
